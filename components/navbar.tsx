"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow transition-shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 hover:text-orange-500">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-black">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-orange-500 transition-colors">
            Products
          </Link>

          <Link href="/checkout" className="relative" aria-label="Shopping Cart">
            <ShoppingCartIcon className="h-6 w-6 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-orange-500 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col p-4 space-y-2 text-white font-medium">
          <li>
            <Link href="/" className="block hover:text-black transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="block hover:text-black transition-colors">
              Products
            </Link>
          </li>
          <li>
            <Link href="/checkout" className="block hover:text-black transition-colors">
              Checkout
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
