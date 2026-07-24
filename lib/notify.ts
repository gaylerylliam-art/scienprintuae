import type { CartItem } from "@/lib/cart";

type NotificationPayload = {
  customerName: string;
  phone: string;
  email?: string;
  message?: string;
  service?: string;
  items?: CartItem[];
};

export function whatsappLink(text: string) {
  return `https://wa.me/971528292446?text=${encodeURIComponent(text)}`;
}

export async function notifyStudio(subject: string, payload: NotificationPayload) {
  const studioEmail = process.env.STUDIO_NOTIFICATION_EMAIL ?? "info@scienprintuae.com";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { sent: false, reason: "RESEND_API_KEY is not configured" };
  }

  const body = [
    `Name: ${payload.customerName}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : "",
    payload.service ? `Service: ${payload.service}` : "",
    payload.message ? `Message: ${payload.message}` : "",
    payload.items?.length ? `Items:\n${payload.items.map((item) => `- ${item.qty} x ${item.name} (${item.category})`).join("\n")}` : ""
  ].filter(Boolean).join("\n\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "ScienPrintUAE <quotes@scienprintuae.com>",
      to: studioEmail,
      subject,
      text: body
    })
  });

  return { sent: response.ok, status: response.status };
}
