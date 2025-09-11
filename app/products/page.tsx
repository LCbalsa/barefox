import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";
import Banner from "@/components/ui/banner"
import CategoryCard from "@/components/ui/category";
import Brand from "@/components/ui/brand";
import Highlight from "@/components/ui/highlight";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="pb-8">
      <Banner />
      <CategoryCard />
      <Brand />
      <h1 className="text-4xl leading-none tracking-tight text-foreground text-center mb-8 pt-10 font-light">
        Discover Our Shoe Collection
      </h1>
      <Highlight />
      <h1 className="text-3xl font-light leading-none tracking-tight text-foreground text-center mb-8 mt-5 pt-10">
        All Products
      </h1>
      <ProductList products={products.data} />
    </div>
  );
}
