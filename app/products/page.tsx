import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";
import Banner from "@/components/ui/banner"
import CategoryCard from "@/components/ui/category";
import Brand from "@/components/ui/brand";
import { Carousel } from "@/components/carousel";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="pb-8">
      <Banner />
      <CategoryCard />
      <Brand />
      <h1 className="text-2xl font-light leading-none tracking-tight text-foreground text-center mb-8 pt-10">
        Featured <span className="text-orange-500">Items</span>
      </h1>
      <section className="py-8 bg-white">
        <Carousel products={products.data} />
      </section>

      <h1 className="text-2xl font-light leading-none tracking-tight text-foreground text-center mb-8 pt-10">
        All <span className="text-orange-500">Products</span>
      </h1>
      <ProductList products={products.data} />
    </div>
  );
}
