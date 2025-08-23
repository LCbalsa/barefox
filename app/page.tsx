import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="rounded bg-orange-50 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to <span className="text-orange-500">Shiroe</span>Shop
            </h2>
            <p className="text-black/70">Discover the latest products at the best prices.</p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-orange-500 hover:bg-orange-500 hover:text-white transition"
            >
              <Link href="/products" className="inline-flex items-center justify-center rounded-full px-6 py-3">
                Browse All Products
              </Link>
            </Button>
          </div>
          <Image
            alt="Hero Image"
            src={products.data[0].images[0]}
            className="rounded border-4 border-black"
            width={450}
            height={450}
          />
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-8 bg-white">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
