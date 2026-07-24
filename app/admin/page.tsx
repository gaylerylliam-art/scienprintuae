import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  description: "ScienPrintUAE admin quote request dashboard."
};

export default function AdminPage() {
  return (
    <section className="min-h-[70vh] bg-charcoal px-4 py-12">
      <div className="container">
        <AdminDashboard />
      </div>
    </section>
  );
}
