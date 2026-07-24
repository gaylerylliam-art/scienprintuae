import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Clock,
  Gem,
  Layers,
  MapPin,
  MessageCircle,
  MousePointerClick,
  PenTool,
  Scissors,
  Shirt,
  Sparkles,
  Star,
  Upload
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/catalog";

const materials = [
  ["Wood", Layers],
  ["Leather", Gem],
  ["Acrylic", Sparkles],
  ["Metal", Award],
  ["Paper", Scissors],
  ["Fabric", Shirt]
];

const process = [
  ["01", "Select your product", "Choose a laser, gifting, corporate, or offset-printing item.", MousePointerClick],
  ["02", "Share your artwork", "Send logo, text, dimensions, quantity, material, and deadline.", Upload],
  ["03", "Confirm your quote", "The studio reviews details, prices manually, and confirms production.", CheckCircle2]
];

const testimonials = [
  ["Aisha R.", "Founder, Luxe Gifts Dubai", "The engraving finish looked premium and the quote process was fast."],
  ["Khalid M.", "Operations Manager", "Our desk nameplates and awards came out sharp, clean, and consistent."],
  ["Sara T.", "Brand Lead", "The team understood the brief and guided us on material choices quickly."]
];

export default function HomePage() {
  const popularProducts = products.slice(0, 8);
  const featuredProducts = products.slice(8, 14);

  return (
    <>
      <section className="market-shell px-4 py-12 md:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow">ScienPrintUAE · Redefining Custom Printing</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.02] text-charcoal md:text-7xl">
              Premium printing, engraving, and branded products <span className="text-walnut">made simple.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              Browse laser and offset products, add them to a quote cart, and send the studio your artwork, quantity, and deadline.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/laser-services">Select Product</Link>
              <Link className="btn-secondary" href="/contact">Contact Us</Link>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {[["6", "Materials"], ["21", "Quote SKUs"], ["JLT", "Dubai Studio"]].map(([value, label]) => (
                <div className="rounded-lg border border-slate-200 bg-white/80 p-4 shadow-sm" key={label}>
                  <p className="font-display text-3xl font-bold text-charcoal">{value}</p>
                  <p className="eyebrow mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 top-8 hidden rounded-lg bg-white p-4 shadow-xl md:block">
              <p className="eyebrow">Live Quote Cart</p>
              <div className="mt-3 space-y-2 text-sm text-ink-soft">
                <p>2 x Wooden coasters</p>
                <p>1 x Business Card</p>
              </div>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-2xl">
              <div className="rounded-[18px] bg-charcoal p-3">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[14px] bg-slate-100">
                  <Image src="/uploads/studio-03.jpeg" alt="Laser engraved wooden QR display by ScienPrintUAE" fill className="object-cover" priority sizes="(min-width: 1024px) 48vw, 90vw" />
                  <svg className="absolute inset-5 h-[calc(100%-40px)] w-[calc(100%-40px)]" viewBox="0 0 500 400" aria-hidden="true">
                    <path className="laser-path" d="M34 34H466V366H34Z M34 34L466 366" fill="none" stroke="#F4C16A" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4">
                {["Artwork", "Material", "Quantity"].map((item) => <div className="rounded-md bg-parchment-lt p-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.08em]" key={item}>{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-8">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="eyebrow">Our Most Popular Categories</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Start with what you need printed</h2>
            </div>
            <Link href="/laser-services" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-walnut">Explore all <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            {categories.map((category) => (
              <Link className="market-card p-4 focus-ring" href={category.parentService === "offset" ? "/offset-printing" : "/laser-services"} key={category.slug}>
                <p className="font-display text-lg font-bold">{category.name}</p>
                <p className="eyebrow mt-6">{category.parentService}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-8">
        <div className="container grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {materials.map(([label, Icon]) => (
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm" key={label as string}>
              <Icon className="text-walnut" size={21} />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.1em]">{label as string}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Our Most Popular Products</p>
              <h2 className="mt-3 font-display text-4xl font-bold">Quote-ready studio catalog</h2>
            </div>
            <Link className="btn-secondary" href="/gallery">View Gallery</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {popularProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section bg-parchment-lt">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">Our Process</p>
            <h2 className="mt-3 font-display text-4xl font-bold">Simple 3 Steps Process</h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-soft">A bespoke quote flow for custom laser and print work, without forcing checkout payment before the brief is reviewed.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {process.map(([step, title, description, Icon]) => (
              <article className="market-card p-6 text-center" key={step as string}>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-laser text-charcoal">
                  <Icon size={24} />
                </div>
                <p className="mt-6 font-mono text-5xl font-bold text-slate-200">{step as string}</p>
                <h3 className="mt-3 font-display text-2xl font-bold">{title as string}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{description as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Featured Product of the Week</p>
              <h2 className="mt-3 font-display text-4xl font-bold">Corporate and everyday picks</h2>
            </div>
            <Link className="btn-primary" href="/laser-services">Select Product</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-4 py-12 text-cream">
        <div className="container grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-laser-glow">Help when you need it</p>
            <h2 className="mt-3 font-display text-4xl font-bold">How to contact our studio team</h2>
            <p className="mt-4 max-w-xl text-parchment">Reach out for product advice, artwork checks, material guidance, production timelines, and custom quote requests.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-primary" href="https://wa.me/971528292446"><MessageCircle size={17} /> WhatsApp Us</Link>
              <Link className="btn-secondary border-cream/30 bg-transparent text-cream hover:bg-cream hover:text-charcoal" href="/contact">Contact Us</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[["6", "materials mastered", Gem], ["2", "core service lines", Layers], ["2025", "founded", Clock], ["JLT", "location", MapPin], ["Email", "info@scienprintuae.com", PenTool], ["Quote", "manual pricing", Building2]].map(([value, label, Icon]) => (
              <div className="rounded-lg border border-cream/10 bg-white/5 p-4" key={`${value}-${label}`}>
                <Icon className="mb-4 text-laser-glow" />
                <p className="font-display text-3xl font-bold">{value as string}</p>
                <p className="eyebrow text-parchment">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container">
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-3 font-display text-4xl font-bold">Hear from customers</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map(([name, role, quote]) => (
              <article className="market-card p-5" key={name}>
                <div className="flex gap-1 text-laser">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div>
                <p className="mt-5 leading-7 text-ink-soft">"{quote}"</p>
                <p className="mt-6 font-display text-xl font-bold">{name}</p>
                <p className="eyebrow mt-1">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
