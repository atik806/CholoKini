"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import type { Product, Category } from "@/src/types/product";
import { ProductGrid } from "@/src/components/product/ProductGrid";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { ShopSkeleton } from "@/src/components/ui/Skeleton";
import { fetchCategoryBySlug, fetchProducts } from "@/src/lib/api";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetchCategoryBySlug(categorySlug, controller.signal),
      fetchProducts({ category: categorySlug, limit: 100 }, controller.signal),
    ])
      .then(([cat, result]) => {
        setCategory(cat);
        setProducts(result.products);
        setLoading(false);
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [categorySlug]);

  if (loading) {
    return <ShopSkeleton />;
  }

  if (!category) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-8"
    >
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          { label: category.name },
        ]}
      />

      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
          {category.name}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">{category.description}</p>
      </div>

      <ProductGrid products={products} />
    </motion.div>
  );
}
