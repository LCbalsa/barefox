import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-white">
      {/* Logo Section */}
      <div className="flex justify-center py-6 bg-white">
        <Image
          src="/logo.png"
          alt="ShiroeShop Logo"
          width={150}
          height={150}
        />
      </div>

      {/* Hero Section */}
      <section className="rounded bg-orange-50 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              About <span className="text-orange-500">ShiroeShop</span>
            </h2>
            <p className="text-black/70">
              At ShiroeShop, we are passionate about bringing you high-quality products at unbeatable prices. Our mission is to make shopping effortless, fun, and reliable.
            </p>
            <p className="text-sm text-red-500">
              Note: This site is for learning/demo purposes only and not for commercial use.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-orange-500 hover:bg-orange-500 hover:text-white transition"
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div>
            <Image
              alt="About ShiroeShop"
              src="/logo-main.png" // Replace with your image path
              width={450}
              height={450}
            />
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-8 sm:px-16 md:grid-cols-3">
          <div className="rounded-lg border p-6 text-center shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-orange-500 mb-2">Our Mission</h3>
            <p className="text-black/70">
              To provide top-quality products that enhance everyday life, all while delivering exceptional customer service.
            </p>
          </div>
          <div className="rounded-lg border p-6 text-center shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-orange-500 mb-2">Our Vision</h3>
            <p className="text-black/70">
              To be a trusted online destination where customers can explore innovative and exciting products.
            </p>
          </div>
          <div className="rounded-lg border p-6 text-center shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-orange-500 mb-2">Our Values</h3>
            <p className="text-black/70">
              Integrity, innovation, and customer satisfaction are at the heart of everything we do.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
