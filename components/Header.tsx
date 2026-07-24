"use client";

import Link from "next/link";
import { Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";

const links = [
  ["Home", "/"],
  ["Laser Services", "/laser-services"],
  ["Offset Printing", "/offset-printing"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { count, openCart } = useCart();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 text-ink shadow-sm backdrop-blur-xl">
      <div className="hidden border-b border-slate-100 bg-charcoal px-4 py-2 text-cream md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs">
          <p className="font-mono uppercase tracking-[0.1em] text-laser-glow">JLT Dubai · Premium laser engraving and offset printing</p>
          <a className="inline-flex items-center gap-2 text-parchment transition hover:text-laser-glow" href="tel:+971528292446">
            <Phone size={14} /> +971 52 829 2446
          </a>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="focus-ring rounded-sm">
          <span className="font-display text-2xl font-bold text-charcoal">ScienPrintUAE</span>
          <span className="ml-2 hidden font-mono text-[10px] uppercase tracking-[0.12em] text-walnut sm:inline">Print made premium</span>
        </Link>
        <div className="hidden min-w-72 max-w-sm flex-1 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-ink-soft xl:flex">
          <Search size={17} />
          <span>Search laser gifts, cards, stationery...</span>
        </div>
        <div className="hidden items-center gap-5 lg:flex">
          {links.map(([label, href]) => <Link className="nav-link" key={href} href={href}>{label}</Link>)}
        </div>
        <div className="flex items-center gap-2">
          <button className="icon-button relative" onClick={openCart} aria-label="Open quote cart">
            <ShoppingBag size={19} />
            {count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-laser px-1.5 font-mono text-[10px] text-charcoal">{count}</span>}
          </button>
          <Link className="btn-primary hidden sm:inline-flex" href="/contact">Get Quote</Link>
          <button className="icon-button-dark lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
        </div>
      </nav>
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-charcoal/45 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div ref={panelRef} className={`absolute right-0 top-0 flex h-dvh w-80 max-w-[86vw] flex-col gap-4 bg-white p-5 text-ink transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
          <button className="icon-button self-end" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={20} /></button>
          {links.map(([label, href]) => <Link className="border-b border-slate-100 py-3 font-display text-xl" key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="btn-primary mt-4 justify-center" href="/contact" onClick={() => setOpen(false)}>Get Quote</Link>
        </div>
      </div>
    </header>
  );
}
