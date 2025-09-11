import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const [wishlist, setWishlist] = useState(false);

  const handleWishlistToggle = () =>{
    setWishlist(prev => !prev);
  };

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group transition duration-300 py-0 h-full flex flex-col gap-0 overflow-hidden">
        {product.images && product.images[0] && (
          <div className="relative h-70 w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="group-hover:opacity-90 transition-opacity duration-300"
            />
            <div className="z-10 absolute bottom-2 right-2 bg-gray-200/60 p-2 rounded-full" onClick={handleWishlistToggle}>
            {wishlist ? <BsHeartFill/> : <BsHeart />}
            </div>
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-md font-light text-gray-900 transition-colors duration-300 truncate w-[290px] lg:w-[200px]">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="mt-auto grid grid-cols-12">
            {price && price.unit_amount && (
              <p className="text-md font-bold text-gray-800 transition-colors duration-300 col-span-11">
                ${(price.unit_amount / 100).toFixed(2)}
              </p>
            )}
            <FiShoppingCart className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
