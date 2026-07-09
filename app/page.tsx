"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/src/components/home/HeroSection";
import { FeaturedCategories } from "@/src/components/home/FeaturedCategories";
import { TrendingProducts } from "@/src/components/home/TrendingProducts";
import { PromoBanner } from "@/src/components/home/PromoBanner";
import { Newsletter } from "@/src/components/home/Newsletter";
import { Testimonials } from "@/src/components/home/Testimonials";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
    </motion.div>
  );
}
