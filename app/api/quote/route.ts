import { NextResponse } from "next/server";
import { z } from "zod";
import { readCart, writeCart } from "@/lib/cart";
import { prisma } from "@/lib/prisma";
import { notifyStudio, whatsappLink } from "@/lib/notify";

const quoteSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional()
});

export async function POST(request: Request) {
  const parsed = quoteSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete the required quote fields." }, { status: 400 });
  }

  const items = await readCart();
  if (!items.length) {
    return NextResponse.json({ error: "Your quote cart is empty." }, { status: 400 });
  }

  const data = parsed.data;
  const quote = await prisma.quoteRequest.create({
    data: {
      customerName: data.customerName,
      phone: data.phone,
      email: data.email || null,
      items,
      adminNotes: data.message
    }
  });

  await notifyStudio("New ScienPrintUAE quote request", { ...data, email: data.email || undefined, items });
  await writeCart([]);

  const text = `Hello ScienPrintUAE, I submitted quote request ${quote.id}.`;
  return NextResponse.json({ ok: true, quoteId: quote.id, whatsappUrl: whatsappLink(text) });
}
