// components/product-detail.tsx
"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { addItem, items } = useCartStore();
  const price = product.default_price as Stripe.Price;

  // Local state for pending quantity before adding to cart
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const cartItem = items.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const increment = () => setSelectedQuantity((q) => q + 1);
  const decrement = () => setSelectedQuantity((q) => (q > 1 ? q - 1 : 1));

  const onAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: selectedQuantity,
    });
    setSelectedQuantity(1); // reset after adding
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain transition duration-300 hover:opacity-90"
          />
        </div>
      )}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4 text-orange-600">{product.name}</h1>
        {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-orange-500">${(price.unit_amount / 100).toFixed(2)}</p>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4 mt-4 mb-4">
          <Button
            variant="outline"
            className="border-orange-400 text-orange-400 hover:bg-orange-50 hover:border-orange-500"
            onClick={decrement}
          >
            –
          </Button>
          <span className="text-lg font-semibold">{selectedQuantity}</span>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={increment}>
            +
          </Button>
        </div>

        {/* Add to Cart Button */}
        <Button className="bg-orange-500 hover:bg-orange-600 text-white py-5 mt-2 text-1xl" onClick={onAddToCart}>
          Add to Cart {cartQuantity > 0 && `(${cartQuantity} in cart)`}
        </Button>
      </div>
    </div>
  );
};
