import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "MyStore",
  description: "Buy cool products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-white">
        <Navbar />

        {/* main grows to fill remaining space */}
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
