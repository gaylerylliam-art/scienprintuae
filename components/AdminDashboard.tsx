"use client";

import { useEffect, useState } from "react";

type Quote = {
  id: string;
  customerName: string;
  phone: string;
  email: string | null;
  items: Array<{ name: string; category: string; qty: number }>;
  status: string;
  manualPrice: string | null;
  paymentLink: string | null;
  adminNotes: string | null;
  createdAt: string;
};

export function AdminDashboard() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  async function loadQuotes() {
    const response = await fetch("/api/admin/quotes", { cache: "no-store" });
    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }
    const data = await response.json();
    setAuthenticated(true);
    setQuotes(data.quotes ?? []);
  }

  async function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(login) });
    if (!response.ok) {
      setError("Invalid admin credentials.");
      return;
    }
    setError("");
    loadQuotes();
  }

  async function updateQuote(quote: Quote, field: string, value: string) {
    const next = { ...quote, [field]: value };
    setQuotes((items) => items.map((item) => item.id === quote.id ? next : item));
    await fetch("/api/admin/quotes", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) });
  }

  useEffect(() => {
    loadQuotes();
  }, []);

  if (!authenticated) {
    return (
      <form className="mx-auto max-w-md space-y-4 rounded-lg border border-laser/20 bg-charcoal-2 p-5 text-cream" onSubmit={submitLogin}>
        <p className="eyebrow text-laser-glow">Admin Login</p>
        <h1 className="font-display text-3xl font-bold">Quote dashboard</h1>
        <input className="field text-ink" type="email" placeholder="Admin email" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} required />
        <input className="field text-ink" type="password" placeholder="Password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} required />
        <button className="btn-primary w-full justify-center">Sign in</button>
        {error && <p className="text-sm text-laser-glow">{error}</p>}
      </form>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="eyebrow text-laser-glow">Admin</p>
        <h1 className="font-display text-4xl font-bold text-cream">Quote requests</h1>
      </div>
      {!quotes.length && <p className="rounded-lg border border-laser/20 bg-charcoal-2 p-5 text-parchment">No quote requests yet.</p>}
      <div className="grid gap-4">
        {quotes.map((quote) => (
          <article className="rounded-lg border border-laser/20 bg-charcoal-2 p-4 text-cream" key={quote.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-bold">{quote.customerName}</p>
                <p className="text-sm text-parchment">{quote.phone} {quote.email ? `· ${quote.email}` : ""}</p>
                <p className="eyebrow mt-2 text-laser-glow">{new Date(quote.createdAt).toLocaleString()}</p>
              </div>
              <select className="field w-auto text-ink" value={quote.status} onChange={(event) => updateQuote(quote, "status", event.target.value)}>
                {["pending", "quoted", "confirmed", "fulfilled"].map((status) => <option key={status}>{status}</option>)}
              </select>
            </div>
            <ul className="mt-4 grid gap-2">
              {(Array.isArray(quote.items) ? quote.items : []).map((item, index) => <li className="rounded bg-charcoal p-3 text-sm" key={`${quote.id}-${index}`}>{item.qty} x {item.name} <span className="text-laser-glow">({item.category})</span></li>)}
            </ul>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <input className="field text-ink" placeholder="Manual price" value={quote.manualPrice ?? ""} onChange={(event) => updateQuote(quote, "manualPrice", event.target.value)} />
              <input className="field text-ink" placeholder="Payment link extension point" value={quote.paymentLink ?? ""} onChange={(event) => updateQuote(quote, "paymentLink", event.target.value)} />
              <input className="field text-ink" placeholder="Admin notes" value={quote.adminNotes ?? ""} onChange={(event) => updateQuote(quote, "adminNotes", event.target.value)} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
