import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";
import Banner from "@/components/ui/banner"

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="pb-8">
      <Banner />
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8 pt-10">
        All <span className="text-orange-500">Products</span>
      </h1>
      <ProductList products={products.data} />
    </div>
  );
}
