import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { notifyStudio, whatsappLink } from "@/lib/notify";

const contactSchema = z.object({
  customerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  service: z.string().min(2),
  message: z.string().min(5)
});

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete every contact field." }, { status: 400 });
  }

  const data = parsed.data;
  const enquiry = await prisma.quoteRequest.create({
    data: {
      customerName: data.customerName,
      phone: data.phone,
      email: data.email,
      items: [],
      status: "pending",
      adminNotes: `Contact form enquiry: ${data.service}\n\n${data.message}`
    }
  });

  await notifyStudio("New ScienPrintUAE contact enquiry", data);
  return NextResponse.json({
    ok: true,
    enquiryId: enquiry.id,
    whatsappUrl: whatsappLink(`Hello ScienPrintUAE, I sent enquiry ${enquiry.id} about ${data.service}.`)
  });
}
