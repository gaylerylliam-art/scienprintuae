import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { productBySlug } from "@/lib/catalog";

export type CartItem = {
  productId: string;
  name: string;
  category: string;
  qty: number;
};

const CART_COOKIE = "scienprint_cart_session";
const emptyItems: CartItem[] = [];

export async function getSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(CART_COOKIE)?.value;

  if (!sessionId) {
    sessionId = randomUUID();
    cookieStore.set(CART_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 90,
      path: "/"
    });
  }

  return sessionId;
}

export async function readCart() {
  const sessionId = await getSessionId();
  try {
    const cart = await prisma.cart.upsert({
      where: { sessionId },
      update: {},
      create: { sessionId, items: emptyItems }
    });

    return normalizeItems(cart.items);
  } catch {
    return emptyItems;
  }
}

export async function writeCart(items: CartItem[]) {
  const sessionId = await getSessionId();
  await prisma.cart.upsert({
    where: { sessionId },
    update: { items },
    create: { sessionId, items }
  });

  return items;
}

export function normalizeItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return emptyItems;
  return value
    .map((item) => ({
      productId: String((item as CartItem).productId ?? ""),
      name: String((item as CartItem).name ?? ""),
      category: String((item as CartItem).category ?? ""),
      qty: Math.max(1, Number((item as CartItem).qty ?? 1))
    }))
    .filter((item) => item.productId && item.name && item.category);
}

export function itemFromSlug(slug: string): CartItem | null {
  const product = productBySlug(slug);
  if (!product) return null;
  return {
    productId: product.slug,
    name: product.name,
    category: product.categoryName,
    qty: 1
  };
}
