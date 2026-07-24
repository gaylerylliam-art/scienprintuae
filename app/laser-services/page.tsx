import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { categories, productsByService } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Laser Services",
  description: "Laser engraving and cutting catalog for personalized gifts, corporate office items, everyday accessories, and occasion-based keepsakes in Dubai."
};

export default function LaserServicesPage() {
  const laserCategories = categories.filter((category) => category.parentService === "laser");
  const laserProducts = productsByService("laser");

  return (
    <>
      <section className="cutting-bed section text-cream">
        <div className="container">
          <p className="eyebrow text-laser-glow">Laser Cutting & Engraving</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold">Custom laser work for wood, leather, acrylic, metal, paper, and fabric.</h1>
          <p className="mt-5 max-w-2xl text-parchment">Every listed subcategory can be added to a quote request with quantity and production notes.</p>
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container space-y-14">
          {laserCategories.map((category) => (
            <div key={category.slug}>
              <p className="eyebrow">{category.name}</p>
              <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {laserProducts.filter((product) => product.categorySlug === category.slug).map((product) => <ProductCard key={product.slug} product={product} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
