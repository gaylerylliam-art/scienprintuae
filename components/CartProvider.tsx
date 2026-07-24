"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { CartItem } from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (productId: string) => Promise<void>;
  openCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ customerName: "", phone: "", email: "", message: "" });
  const [notice, setNotice] = useState("");
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  async function refresh() {
    const response = await fetch("/api/cart", { cache: "no-store" });
    const data = await response.json();
    setItems(data.items ?? []);
  }

  async function addItem(productId: string) {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId })
    });
    const data = await response.json();
    setItems(data.items ?? []);
    setOpen(true);
  }

  async function updateQty(productId: string, qty: number) {
    const response = await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qty })
    });
    const data = await response.json();
    setItems(data.items ?? []);
  }

  async function submitQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Sending quote request...");
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    if (!response.ok) {
      setNotice(data.error ?? "Quote request could not be sent.");
      return;
    }
    setItems([]);
    setNotice(`Quote ${data.quoteId} received. WhatsApp fallback is ready.`);
    window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(() => ({ items, count, addItem, openCart: () => setOpen(true) }), [items, count]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <button
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-laser text-charcoal shadow-laser focus-ring md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open quote cart"
      >
        <ShoppingBag size={22} />
        {count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-cream px-2 py-0.5 font-mono text-[11px] font-bold">{count}</span>}
      </button>
      <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-charcoal/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-cream p-5 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`} aria-label="Quote cart">
          <div className="flex items-center justify-between border-b border-walnut/20 pb-4">
            <div>
              <p className="eyebrow">Quote Cart</p>
              <h2 className="font-display text-2xl font-bold">Made-to-order request</h2>
            </div>
            <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close quote cart"><X size={20} /></button>
          </div>
          <div className="space-y-3 py-5">
            {items.length === 0 && <p className="text-sm text-ink-soft">Your quote cart is empty. Add a catalog item to start a bespoke request.</p>}
            {items.map((item) => (
              <div key={item.productId} className="rounded-lg border border-walnut/15 bg-parchment-lt p-3">
                <p className="font-display font-semibold">{item.name}</p>
                <p className="eyebrow mt-1">{item.category}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="icon-button" onClick={() => updateQty(item.productId, item.qty - 1)} aria-label={`Decrease ${item.name}`}><Minus size={16} /></button>
                    <span className="w-8 text-center font-mono text-sm">{item.qty}</span>
                    <button className="icon-button" onClick={() => updateQty(item.productId, item.qty + 1)} aria-label={`Increase ${item.name}`}><Plus size={16} /></button>
                  </div>
                  <button className="icon-button" onClick={() => updateQty(item.productId, 0)} aria-label={`Remove ${item.name}`}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
          <form className="space-y-3 border-t border-walnut/20 pt-4" onSubmit={submitQuote}>
            <input className="field" placeholder="Name" value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} required />
            <input className="field" placeholder="Phone / WhatsApp" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required />
            <input className="field" type="email" placeholder="Email optional" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <textarea className="field min-h-24" placeholder="Notes, sizes, deadline, material, quantity..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
            <button className="btn-primary w-full" type="submit" disabled={!items.length}>Submit quote request</button>
            {notice && <p className="text-sm text-ink-soft" role="status">{notice}</p>}
          </form>
        </aside>
      </div>
    </CartContext.Provider>
  );
}
