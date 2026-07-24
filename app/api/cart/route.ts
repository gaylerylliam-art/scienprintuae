import { NextResponse } from "next/server";
import { itemFromSlug, readCart, writeCart } from "@/lib/cart";

export async function GET() {
  return NextResponse.json({ items: await readCart() });
}

export async function POST(request: Request) {
  const { productId, qty = 1 } = await request.json();
  const newItem = itemFromSlug(String(productId));

  if (!newItem) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const items = await readCart();
  const existing = items.find((item) => item.productId === newItem.productId);

  if (existing) {
    existing.qty += Math.max(1, Number(qty));
  } else {
    items.push({ ...newItem, qty: Math.max(1, Number(qty)) });
  }

  return NextResponse.json({ items: await writeCart(items) });
}

export async function PATCH(request: Request) {
  const { productId, qty } = await request.json();
  const items = await readCart();
  const next = items
    .map((item) => item.productId === productId ? { ...item, qty: Math.max(0, Number(qty)) } : item)
    .filter((item) => item.qty > 0);

  return NextResponse.json({ items: await writeCart(next) });
}

export async function DELETE(request: Request) {
  const { productId } = await request.json();
  const items = (await readCart()).filter((item) => item.productId !== productId);
  return NextResponse.json({ items: await writeCart(items) });
}
