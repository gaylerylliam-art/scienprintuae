import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const ok = await loginAdmin(String(email ?? ""), String(password ?? ""));

  if (!ok) {
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
