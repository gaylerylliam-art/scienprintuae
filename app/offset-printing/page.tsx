import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { productsByService } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Offset Printing",
  description: "Quote-ready offset printing products for business cards, envelopes, and letterheads from ScienPrintUAE in Dubai."
};

export default function OffsetPrintingPage() {
  const offsetProducts = productsByService("offset");

  return (
    <>
      <section className="bg-parchment-lt section">
        <div className="container">
          <p className="eyebrow">Offset Printing</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold">Business stationery with clear stock, finish, size, and minimum quantity specs.</h1>
          <p className="mt-5 max-w-2xl text-ink-soft">Add a print product to the quote cart, then include quantity, finish, artwork status, and deadline in the cart notes.</p>
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offsetProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>
    </>
  );
}
