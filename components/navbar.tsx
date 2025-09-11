// components/navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCartIcon,
  MenuIcon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";

export const Navbar = () => {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setIsAuthenticated(true);
        setUserName(session.user.user_metadata?.username || null);
      } else {
        setIsAuthenticated(false);
        setUserName(null);
      }

      setIsLoading(false); // session check finished
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUserName(session.user.user_metadata?.username || null);
      } else {
        setIsAuthenticated(false);
        setUserName(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserName(null);
    window.location.replace("/login");
  };

  const CartLink = (
    <Link href="/checkout" className="relative" aria-label="Cart">
      <ShoppingCartIcon className="h-6 w-6 text-black" />
      {isAuthenticated && cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
          {cartCount}
        </span>
      )}
    </Link>
  );

  const AuthButton = isLoading ? null : isAuthenticated ? (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 text-black hover:bg-orange-100"
      onClick={handleLogout}
    >
      <LogOutIcon className="h-4 w-4" /> Logout
    </Button>
  ) : (
    <Link
      href="/login"
      className="flex items-center gap-1 text-black hover:text-orange-500"
    >
      <LogInIcon className="h-4 w-4" /> Login
    </Link>
  );

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
          <p className="text-xl text-black font-bold">Barefox</p>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-light text-black">
          {isAuthenticated && (
            <span className="hover:text-orange-500">
              {userName || "Loading..."}
            </span>
          )}
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <Link href="/products" className="hover:text-orange-500">
            Products
          </Link>
          {CartLink}
          {AuthButton}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          {CartLink}
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
                {isAuthenticated && userName && (
                  <span className="text-sm text-gray-700">{userName}</span>
                )}
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
                <SheetClose asChild>{AuthButton}</SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
