// components/product-detail.tsx
"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect, SetStateAction } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const router = useRouter();
  const { addItem, items } = useCartStore();
  const price = product.default_price as Stripe.Price;

  // Local state for pending quantity before adding to cart
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const cartItem = items.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const increment = () => setSelectedQuantity((q) => q + 1);
  const decrement = () => setSelectedQuantity((q) => (q > 1 ? q - 1 : 1));

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  const onAddToCart = () => {
    if (!isAuthenticated) {
      router.push("/login"); // redirect to login
      return; // stop execution, cart is NOT updated
    }

    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: selectedQuantity,
    });
    setSelectedQuantity(1); // reset after adding
  };

  const [sizeSelect, setSizeSelect] = useState('S');

  const handleSizeSelect = (size: SetStateAction<string>) => {
    setSizeSelect(size);
  };

  return (
    <div className="container mx-auto px-4 lg:py-8 py-2 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative lg:h-160 h-100 w-full md:w-1/2 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain transition duration-300 hover:opacity-90"
          />
        </div>
      )}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-light mb-4">
          {product.name}
        </h1>
        {/* {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )} */}
        {price && price.unit_amount && (
          <p className="text-lg font-bold">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        <p className="text-gray-400 text-xs">(Additional fee may apply upon checkout)</p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4 mt-4 mb-4">
          <Button
            variant="outline"
            className="border-gray-400 text-black-400 hover:bg-gray-200 hover:border-gray-500"
            onClick={decrement}
          >
            –
          </Button>
          <span className="text-lg font-semibold">{selectedQuantity}</span>
          <Button
            className="bg-gray-900 hover:bg-black text-white"
            onClick={increment}
          >
            +
          </Button>

        </div>

        {/* Size Selector */}
        <div className="mt-10 mb-10">
          <h1 className="text-sm text-gray-500">Select Size</h1>
            <ul className="flex flex-wrap w-full text-sm font-light pl-5 pt-2 text-center gap-2 sm:gap-4 lg:gap-5">
              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map((size) => (
                <li
                  key={size}
                  className={`lg:p-3 p-4 cursor-pointer ${
                    size === sizeSelect ? 'bg-gray-400/10 rounded-sm font-medium' : 'text-black'
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </li>
              ))}
            </ul>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="border-1 border-gray-600 bg-white font-light text-gray-900 hover:bg-black hover:text-white
          mt-2 text-md p-6 w-full lg:w-3/4"
          onClick={onAddToCart}
        >
          Add to Cart {cartQuantity > 0 && `(${cartQuantity} in cart)`}
        </Button>
      </div>
    </div>
  );
};
