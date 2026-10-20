import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import ProductForm from "@/components/admin/ProductForm";
import { readDb } from "@/lib/db";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = (await readDb()).products.find((p) => p.id === params.id);
  if (!product) notFound();
  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="text-sm text-cream/60 hover:text-cream">← Back to products</Link>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl text-cream">Edit {product.name}</h1>
        <Link href={`/shop/${product.slug}`} target="_blank" className="text-sm text-cream/60 underline underline-offset-2 hover:text-cream">See it in the shop ↗</Link>
      </div>
      <p className="text-sm text-cream/60">Change anything below, then tap <strong className="font-medium text-cream">Save changes</strong>. To use a new photo, tap Change photo.</p>
      <ProductForm product={product} />
      <section className="space-y-3 rounded-lg border border-cream/15 bg-ink-800 p-5 sm:p-6">
        <h2 className="text-base text-cream">Remove this product</h2>
        <p className="text-sm text-cream/60">Deleting takes it out of the shop for good. Orders customers already placed keep their details. If it&apos;s only out of stock for now, set the bottles to 0 instead: it will show &ldquo;Sold out&rdquo; and you can add stock later.</p>
        <DeleteProductButton id={product.id} name={product.name} redirectTo="/admin/products" />
      </section>
    </div>
  );
}
