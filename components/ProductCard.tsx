"use client";

import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { useCart } from "@/components/CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="market-card group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 30vw, 90vw" />
      </div>
      <div className="space-y-3 p-4">
        <p className="eyebrow">{product.categoryName}</p>
        <h3 className="font-display text-xl font-bold">{product.name}</h3>
        <p className="text-sm leading-6 text-ink-soft">{product.shortDescription}</p>
        {product.specSheet && (
          <dl className="grid gap-2 rounded-md border border-walnut/10 bg-parchment-lt p-3 text-xs">
            {Object.entries(product.specSheet).map(([key, value]) => (
              <div className="flex justify-between gap-3" key={key}>
                <dt className="font-mono uppercase text-walnut">{key}</dt>
                <dd className="text-right text-ink-soft">{value}</dd>
              </div>
            ))}
          </dl>
        )}
        <button className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-charcoal transition hover:border-laser hover:bg-laser/10 focus-ring" onClick={() => addItem(product.slug)}>
          <span className="inline-flex items-center gap-2"><Plus size={17} /> Add to Quote</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}
