"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";

const filters = ["All", "Personalized Gifts & Decor", "Corporate & Office Items", "Everyday & Accessories", "Offset Printing"];

export function GalleryGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const visible = useMemo(() => filter === "All" ? products : products.filter((product) => product.categoryName === filter), [filter, products]);
  const activeProduct = active == null ? null : visible[active];

  useEffect(() => {
    if (active == null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => value == null ? value : (value + 1) % visible.length);
      if (event.key === "ArrowLeft") setActive((value) => value == null ? value : (value - 1 + visible.length) % visible.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, visible.length]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button key={item} className={`chip ${filter === item ? "chip-active" : ""}`} onClick={() => { setFilter(item); setActive(null); }}>{item}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, index) => (
          <button className="group text-left focus-ring" key={product.slug} onClick={() => setActive(index)}>
            <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-charcoal-soft">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform group-hover:scale-105" sizes="(min-width: 1024px) 30vw, 90vw" />
            </span>
            <span className="mt-3 block font-display text-lg font-bold">{product.name}</span>
            <span className="eyebrow mt-1 block">{product.categoryName}</span>
          </button>
        ))}
      </div>
      {activeProduct && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-charcoal/90 p-4" role="dialog" aria-modal="true" aria-label={activeProduct.name}>
          <button className="icon-button-dark absolute right-4 top-4" onClick={() => setActive(null)} aria-label="Close gallery lightbox"><X /></button>
          <button className="icon-button-dark absolute left-4 top-1/2" onClick={() => setActive((active! - 1 + visible.length) % visible.length)} aria-label="Previous image"><ChevronLeft /></button>
          <div className="w-full max-w-4xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-charcoal-soft">
              <Image src={activeProduct.images[0]} alt={activeProduct.name} fill className="object-contain" sizes="90vw" />
            </div>
            <p className="mt-4 text-center font-display text-2xl font-bold text-cream">{activeProduct.name}</p>
          </div>
          <button className="icon-button-dark absolute right-4 top-1/2" onClick={() => setActive((active! + 1) % visible.length)} aria-label="Next image"><ChevronRight /></button>
        </div>
      )}
    </>
  );
}
