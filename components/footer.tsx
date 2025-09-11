"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col items-start gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Image
              src="/logo-main.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <p className="text-lg font-bold text-black">
              barefox
            </p>
          </Link>
          <p className="text-sm text-gray-600">
            This website is created for learning/demo purposes only and is{" "}
            <strong>not for commercial use</strong>.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold text-black mb-3">Quick Links</h3>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/" className="hover:text-orange-500">
              Home
            </Link>
            <Link href="/products" className="hover:text-orange-500">
              Products
            </Link>
            <Link href="/checkout" className="hover:text-orange-500">
              Checkout
            </Link>
            <Link href="/about" className="hover:text-orange-500">
              About Us
            </Link>
          </nav>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-md font-semibold text-black mb-3">Connect</h3>
          <div className="flex gap-4">
            <Link
              href="https://linkedin.com/in/brianshiroe"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-gray-600 hover:text-orange-500" />
            </Link>
            <Link
              href="https://github.com/brianshiroe"
              target="_blank"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-gray-600 hover:text-orange-500" />
            </Link>
            <Link
              href="mailto:brianshiroe@gmail.com"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-gray-600 hover:text-orange-500" />
            </Link>
            <Link
              href="https://facebook.com/brianshiroe"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-gray-600 hover:text-orange-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShiroeShop. This project is for educational/demo
        purposes only. Not a real store.
      </div>
    </footer>
  );
};
