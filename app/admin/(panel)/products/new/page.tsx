import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      <Link href="/admin/products" className="text-[11px] uppercase tracking-wider2 text-cream/60 hover:text-gold">← All products</Link>
      <h1 className="font-serif text-4xl text-cream">Add Product</h1>
      <ProductForm />
    </div>
  );
}
