import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Filterable ScienPrintUAE gallery for laser engraved gifts, corporate products, accessories, and offset printing work."
};

export default function GalleryPage() {
  return (
    <>
      <section className="cutting-bed section text-cream">
        <div className="container">
          <p className="eyebrow text-laser-glow">Gallery</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold">Studio work organized by product line.</h1>
          <p className="mt-5 max-w-2xl text-parchment">These seed photos live in public uploads so real studio photography can replace them cleanly later.</p>
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container">
          <GalleryGrid products={products} />
        </div>
      </section>
    </>
  );
}
