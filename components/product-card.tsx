import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { motion } from 'motion/react'
import { BsFillCartDashFill } from "react-icons/bs";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const [wishlistToggle, setWishlistToggle] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [cartHoverLocked, setCartHoverLocked] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);

  const handleWishlistToggle = () => {
    setWishlistToggle(prev => !prev);
  };

  const handleCartToggle = () => {
    setCartToggle(prev => !prev);
    setCartHoverLocked(true);
    setCartHover(false);
    setCartClicked(true); // Using this for the cart animation
  }

  useEffect(() => {
    if (cartHoverLocked) {
      const timer = setTimeout(() => {
        setCartHoverLocked(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cartHoverLocked]);

  useEffect(() => {
    if(cartClicked) {
      const timer = setTimeout(() => {
        setCartClicked(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cartClicked]);

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="flex items-center justify-center mt-10">
        <Card className="group transition duration-300 py-0 h-full flex flex-col gap-0 overflow-hidden w-60">
          {product.images && product.images[0] && (
            <div className="relative h-70 w-full">
              <Image
                src={product.images[0]}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="group-hover:opacity-90 transition-opacity duration-300"
              />

              <div className="z-10 absolute bottom-4 right-4 md:bottom-3 md:right-3 lg:bottom-2 lg:right-4 bg-gray-300/80 p-2 sm:bottom rounded-full" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWishlistToggle();
              }}>
                <motion.div
                  animate={{rotateY: wishlistToggle ? 180 : 0}}
                  transition={{ duration: 0.3, ease:"easeInOut"}}>
                {wishlistToggle ? <BsHeartFill className="text-red-800"/> : <BsHeart />}
              </motion.div>
              </div>
            </div>

          )}
          <CardHeader className="p-4">
            <CardTitle className="text-md font-light text-gray-900 transition-colors duration-300 truncate w-[215px] md:w-[220px] lg:w-[215px]">
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

              <motion.div 
              animate={cartClicked ? { scale: 1.4 } : {scale: 1}}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onMouseEnter={() => {
                if(!cartHoverLocked) setCartHover(true);
              }} 

              onMouseLeave={() => {
                if(!cartHoverLocked) setCartHover(false);
              }}
            
              onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCartToggle();
              }}
              >
                
              {!cartToggle ? (
                <BsCart className="h-5 w-5" />
              ) : cartHover ? (
                <BsFillCartDashFill className="h-5 w-5 text-red-700" />
              ) : (
                <BsCartCheckFill className="h-5 w-5" />
              )}

              </motion.div>

            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};
