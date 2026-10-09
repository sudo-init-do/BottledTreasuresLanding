import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { readDb } from "@/lib/db";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = (await readDb()).products.find((p) => p.id === params.id);
  if (!product) notFound();
  return (
    <div className="space-y-8">
      <Link href="/admin/products" className="text-[11px] uppercase tracking-wider2 text-cream/60 hover:text-gold">← All products</Link>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-4xl text-cream">Edit {product.name}</h1>
        <Link href={`/shop/${product.slug}`} target="_blank" className="text-[11px] uppercase tracking-wider2 text-cream/60 hover:text-gold">View in shop ↗</Link>
      </div>
      <ProductForm product={product} />
      <div className="border-t border-gold/15 pt-8">
        <p className="mb-3 text-sm text-cream/60">Deleting removes it from the shop for good. Past orders keep their details.</p>
        <DeleteProductButton id={product.id} name={product.name} redirectTo="/admin/products" />
      </div>
    </div>
  );
}
