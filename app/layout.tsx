import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://scienprintuae.com"),
  title: {
    default: "ScienPrintUAE | Premium Laser Engraving & Offset Printing Dubai",
    template: "%s | ScienPrintUAE"
  },
  description: "Premium made-to-order laser engraving, cutting, offset printing, and branded products from ScienPrintUAE in JLT, Dubai."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="border-t border-walnut/15 bg-charcoal px-4 py-10 text-cream">
            <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-display text-2xl font-bold">ScienPrintUAE</p>
                <p className="mt-1 text-sm text-parchment">The Standard of Premium Printing - Because Only the Best Will Do.</p>
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.1em] text-laser-glow">Jumeirah Lake Towers, Dubai · +971 52 829 2446</div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
