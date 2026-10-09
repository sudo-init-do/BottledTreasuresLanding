import Link from "next/link";
import CustomerForm from "@/components/admin/CustomerForm";

export default function NewCustomerPage() {
  return (
    <div className="space-y-8">
      <Link href="/admin/customers" className="text-[11px] uppercase tracking-wider2 text-cream/60 hover:text-gold">← All customers</Link>
      <h1 className="font-serif text-4xl text-cream">Add Customer</h1>
      <CustomerForm />
    </div>
  );
}
