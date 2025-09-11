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
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const Navbar = () => {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (user) {
        setIsAuthenticated(true);

        const { data: profile, error } = await supabase
          .from("users")
          .select("username")
          .eq("id", user.id)
          .single();

        if (!error && profile) {
          setUserName(profile.username);
        } else {
          setIsAuthenticated(false);
          setUserName(null);
        }
      }
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut(); // ensures session is cleared
    setIsAuthenticated(false);
    setUserName(null);
    router.push("/login");
    window.location.replace("/login");
  };

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
          <p className="px-1 text-xl text-black font-michroma">
            BareFox
          </p>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-light text-black">
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
            {isAuthenticated && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              {userName && (
                <span className="text-sm text-gray-700">{userName}</span>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-black hover:bg-orange-100"
                onClick={handleLogout}
              >
                <LogOutIcon className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 text-black hover:text-orange-500"
            >
              <LogInIcon className="h-4 w-4" />
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/checkout" className="relative" aria-label="Cart">
            <ShoppingCartIcon className="h-6 w-6 text-black" />
            {/* NEED TO UPDATE, CURRENTLY STORE DATA IN LOCALSTORAGE INSTEAD OF DB. */}
            {isAuthenticated && cartCount > 0 && (
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

                {isAuthenticated ? (
                  <>
                    {userName && (
                      <span className="text-sm text-gray-700">{userName}</span>
                    )}
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-black hover:bg-orange-100"
                        onClick={handleLogout}
                      >
                        <LogOutIcon className="h-4 w-4" /> Logout
                      </Button>
                    </SheetClose>
                  </>
                ) : (
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="flex items-center gap-1 text-black hover:text-orange-500"
                    >
                      <LogInIcon className="h-4 w-4" /> Login
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
