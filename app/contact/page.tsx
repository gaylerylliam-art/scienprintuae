import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ScienPrintUAE in JLT, Dubai for laser engraving, offset printing, graphic design, and custom manufacturing quote requests."
};

export default function ContactPage() {
  return (
    <>
      <section className="cutting-bed section text-cream">
        <div className="container">
          <p className="eyebrow text-laser-glow">Contact</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold">Tell the studio what you want made.</h1>
          <p className="mt-5 max-w-2xl text-parchment">For fastest turnaround, include material, size, quantity, artwork status, and deadline.</p>
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            <a className="trace-card group block p-5 focus-ring" href="tel:+971528292446">
              <p className="eyebrow">Call</p>
              <p className="mt-2 font-display text-2xl font-bold">+971 52 829 2446</p>
              <svg className="trace-border" aria-hidden="true"><rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="8" /></svg>
            </a>
            <a className="trace-card group block p-5 focus-ring" href="https://wa.me/971528292446">
              <p className="eyebrow">WhatsApp</p>
              <p className="mt-2 font-display text-2xl font-bold">Start chat</p>
              <svg className="trace-border" aria-hidden="true"><rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="8" /></svg>
            </a>
            <a className="trace-card group block p-5 focus-ring" href="mailto:info@scienprintuae.com">
              <p className="eyebrow">Email</p>
              <p className="mt-2 font-display text-2xl font-bold">info@scienprintuae.com</p>
              <svg className="trace-border" aria-hidden="true"><rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="8" /></svg>
            </a>
            <div className="rounded-lg border border-walnut/20 bg-parchment-lt p-5 shadow-sm">
              <p className="eyebrow">Studio Location</p>
              <p className="mt-2 font-display text-2xl font-bold">Jumeirah Lake Towers (JLT), Dubai, UAE</p>
            </div>
          </aside>
          <div className="space-y-5">
            <ContactForm />
            <iframe
              className="h-80 w-full rounded-lg border border-walnut/15"
              title="ScienPrintUAE location map"
              loading="lazy"
              src="https://www.google.com/maps?q=Jumeirah%20Lake%20Towers%20Dubai%20UAE&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  );
}
