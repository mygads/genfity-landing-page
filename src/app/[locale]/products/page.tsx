"use client";
import React from "react";
import { useCart } from "@/components/Cart/CartContext";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { productsData } from "./components/productsData";

const products = [
  {
    id: "1",
    name: "Produk A",
    price: 150000,
    image: "/images/brands/logo.svg",
  },
  {
    id: "2",
    name: "Produk B",
    price: 200000,
    image: "/images/brands/butterbytes.svg",
  },
  {
    id: "3",
    name: "Produk C",
    price: 120000,
    image: "/images/brands/lure.svg",
  },
];

export default function ProductsPage() {
  const { addToCart } = useCart();

  return (
    <>
    <HeroParallax products={productsData} />;
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center bg-white dark:bg-gray-900 shadow">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-contain mb-3" />
            <div className="font-semibold mb-1">{product.name}</div>
            <div className="text-primary font-bold mb-2">Rp{product.price.toLocaleString()}</div>
            <button
              onClick={() => addToCart(product)}
              className="mt-auto px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
