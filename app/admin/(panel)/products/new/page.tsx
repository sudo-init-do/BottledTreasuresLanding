import Link from "next/link";
import HelpBox from "@/components/admin/HelpBox";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="text-sm text-cream/60 hover:text-cream">← Back to products</Link>
      <h1 className="text-3xl text-cream">Add a new product</h1>
      <HelpBox title="What to fill in">
        <p>Only the boxes marked * are needed: a photo, the name, the price and how many bottles you have.</p>
        <p>Everything else is optional. You can change any of it later by tapping Edit on the Products page.</p>
      </HelpBox>
      <ProductForm />
    </div>
  );
}
