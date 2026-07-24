import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const quotes = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ quotes });
}

export async function PATCH(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status, manualPrice, paymentLink, adminNotes } = await request.json();
  const quote = await prisma.quoteRequest.update({
    where: { id: String(id) },
    data: {
      status: String(status),
      manualPrice: manualPrice === "" || manualPrice == null ? null : manualPrice,
      paymentLink: paymentLink || null,
      adminNotes: adminNotes || null
    }
  });

  return NextResponse.json({ quote });
}
