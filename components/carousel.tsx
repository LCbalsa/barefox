"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // ✅ import Link

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Link href={`/products/${currentProduct.id}`} passHref>
      <Card className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 items-center p-6 gap-6">
          {/* Left column → Image */}
          {currentProduct.images && currentProduct.images[0] && (
            <div className="relative h-64 w-full flex items-center justify-center">
              <Image
                src={currentProduct.images[0]}
                alt={currentProduct.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}

          {/* Right column → Text */}
          <div className="flex flex-col justify-center items-start space-y-4">
            <CardTitle className="text-3xl font-bold text-gray-800">
              {currentProduct.name}
            </CardTitle>
            {price && price.unit_amount && (
              <p className="text-2xl font-semibold text-gray-600">
                ${(price.unit_amount / 100).toFixed(2)}
              </p>
            )}
            <span className="text-sm text-blue-600 underline">
              View details →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
