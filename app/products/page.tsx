import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";
import Banner from "@/components/ui/banner"
import CategoryCard from "@/components/ui/category";
import { Carousel } from "@/components/carousel";
import { brands } from "@/public/brand/brand";
import Image from "next/image";
import Brand from "@/components/ui/brand";

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
        All <span className="text-orange-500">Products</span>
      </h1>
      <ProductList products={products.data} />
    </div>
  );
}
