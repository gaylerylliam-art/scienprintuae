import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";

const ADMIN_COOKIE = "scienprint_admin";

function secret() {
  return process.env.ADMIN_PASSWORD ?? process.env.DATABASE_URL ?? "scienprint-dev-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function createToken(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + 1000 * 60 * 60 * 8 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: number };
  return typeof parsed.exp === "number" && parsed.exp > Date.now();
}

export async function loginAdmin(email: string, password: string) {
  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;
  let valid = Boolean(envEmail && envPassword && email === envEmail && password === envPassword);

  if (!valid) {
    try {
      const admin = await prisma.adminUser.findUnique({ where: { email } });
      valid = Boolean(admin && await bcrypt.compare(password, admin.passwordHash));
    } catch {
      valid = false;
    }
  }

  if (!valid) return false;

  const token = createToken(email);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return true;
}

export async function isAdminLoggedIn() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  try {
    return verifyToken(token);
  } catch {
    return false;
  }
}
