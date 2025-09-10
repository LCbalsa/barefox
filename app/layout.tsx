import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "shiroe-ecommerce",
  description: "Shiroe E-commerce is a modern, responsive online shopping platform built with Next.js, TailwindCSS, Shadcn/UI, and Stripe, designed to deliver a seamless and secure shopping experience. It features a dynamic product catalog, efficient shopping cart management, and smooth Stripe Checkout integration, all wrapped in a clean, customizable UI. With reusable components and a mobile-friendly design, Shiroe E-commerce ensures fast performance, accessibility, and an intuitive user experience from browsing to payment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-white min-w-[320px]">
        <Navbar />

        {/* main grows to fill remaining space */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
