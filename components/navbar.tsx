"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon, MenuIcon } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80">
          <Image
            src="/logo-main.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-lg font-bold text-black ">
            <span className="text-orange-500">Shiroe</span>Shop
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-black">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-orange-500 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className="relative hover:text-orange-500 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/checkout" className="relative" aria-label="Cart">
            <ShoppingCartIcon className="h-6 w-6 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-black hover:bg-orange-100"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white p-6">
              <nav className="flex flex-col space-y-4 text-lg font-medium">
                <SheetClose asChild>
                  <Link href="/" className="hover:text-orange-500">
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/products" className="hover:text-orange-500">
                    Products
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/checkout" className="hover:text-orange-500">
                    Checkout
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
