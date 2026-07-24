import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About ScienPrintUAE, a creative printing and branding company established in Dubai in 2025."
};

const values = ["Premium materials always", "Precision manufacturing", "Made to order", "Reliable turnaround"];

export default function AboutPage() {
  return (
    <>
      <section className="bg-parchment-lt section">
        <div className="container max-w-5xl">
          <p className="eyebrow">About ScienPrintUAE</p>
          <h1 className="mt-4 font-display text-5xl font-bold">Premium printing and customized manufacturing from JLT, Dubai.</h1>
          <div className="mt-8 space-y-5 text-lg leading-8 text-ink-soft">
            <p>Established in 2025 in Dubai, United Arab Emirates, ScienPrintUAE is a creative printing and branding company specializing in traditional and digital printing, laser cutting and engraving, graphic design, and customized manufacturing. We produce premium products on wood, leather, acrylic, metal, paper, and fabric, delivering innovative, precise, and reliable branding solutions that help businesses and individuals stand out.</p>
            <blockquote className="border-l-4 border-laser pl-5 font-display text-2xl font-bold text-ink">"The Standard of Premium Printing - Because Only the Best Will Do."</blockquote>
          </div>
        </div>
      </section>
      <section className="section bg-charcoal text-cream">
        <div className="container grid gap-4 md:grid-cols-4">
          {values.map((value) => (
            <article className="rounded-lg border border-laser/20 bg-cream/5 p-5" key={value}>
              <p className="eyebrow text-laser-glow">Value</p>
              <h2 className="mt-8 font-display text-2xl font-bold">{value}</h2>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
