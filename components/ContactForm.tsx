"use client";

import { useState } from "react";
import { serviceOptions } from "@/lib/catalog";

export function ContactForm() {
  const [form, setForm] = useState({ customerName: "", email: "", phone: "", service: serviceOptions[0], message: "" });
  const [notice, setNotice] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Sending enquiry...");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    if (!response.ok) {
      setNotice(data.error ?? "Enquiry could not be sent.");
      return;
    }
    setNotice(`Enquiry ${data.enquiryId} received. WhatsApp fallback is opening.`);
    window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="rounded-lg border border-walnut/20 bg-parchment-lt p-5 shadow-sm md:p-6" onSubmit={submit}>
      <p className="eyebrow">Contact Form</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <input className="field" placeholder="Name" value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} required />
        <input className="field" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <input className="field" placeholder="Phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required />
        <select className="field" value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}>
          {serviceOptions.map((service) => <option key={service}>{service}</option>)}
        </select>
        <textarea className="field min-h-36 md:col-span-2" placeholder="Message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required />
      </div>
      <button className="btn-primary mt-4" type="submit">Send Enquiry</button>
      {notice && <p className="mt-3 text-sm text-ink-soft" role="status">{notice}</p>}
    </form>
  );
}
