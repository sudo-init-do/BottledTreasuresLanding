import Link from "next/link";
import { notFound } from "next/navigation";
import CustomerForm from "@/components/admin/CustomerForm";
import { readDb } from "@/lib/db";

export default async function EditCustomerPage({ params }: { params: { id: string } }) {
  const found = (await readDb()).customers.find((c) => c.id === params.id);
  if (!found) notFound();
  const { passwordHash: _, ...customer } = found;
  return (
    <div className="space-y-8">
      <Link href="/admin/customers" className="text-[11px] uppercase tracking-wider2 text-cream/60 hover:text-gold">← All customers</Link>
      <h1 className="font-serif text-4xl text-cream">Edit {customer.name}</h1>
      <CustomerForm customer={customer} />
    </div>
  );
}
