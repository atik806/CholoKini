"use client";

import { motion } from "framer-motion";
import { Ruler } from "lucide-react";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";

const sizeTables = [
  {
    category: "Clothing",
    sizes: [
      { size: "XS", chest: "31-33", waist: "26-28", hip: "33-35" },
      { size: "S", chest: "34-36", waist: "29-31", hip: "36-38" },
      { size: "M", chest: "37-39", waist: "32-34", hip: "39-41" },
      { size: "L", chest: "40-42", waist: "35-37", hip: "42-44" },
      { size: "XL", chest: "43-45", waist: "38-40", hip: "45-47" },
      { size: "XXL", chest: "46-48", waist: "41-43", hip: "48-50" },
    ],
  },
  {
    category: "Shoes",
    sizes: [
      { size: "US 6", chest: "UK 5.5", waist: "EU 39", hip: "9.4\"" },
      { size: "US 7", chest: "UK 6.5", waist: "EU 40", hip: "9.8\"" },
      { size: "US 8", chest: "UK 7.5", waist: "EU 41", hip: "10.2\"" },
      { size: "US 9", chest: "UK 8.5", waist: "EU 42", hip: "10.6\"" },
      { size: "US 10", chest: "UK 9.5", waist: "EU 43", hip: "11\"" },
      { size: "US 11", chest: "UK 10.5", waist: "EU 44", hip: "11.4\"" },
    ],
  },
  {
    category: "Accessories (One Size)",
    sizes: [
      { size: "Standard", chest: "Adjustable", waist: "Fits most", hip: "" },
      { size: "Extended", chest: "Larger fit", waist: "Fits plus size", hip: "" },
    ],
  },
];

export default function SizeGuidePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-8"
    >
      <Breadcrumbs items={[{ label: "Size Guide" }]} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Ruler className="w-7 h-7 text-primary dark:text-primary-light" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Size Guide</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg mx-auto">
            Find your perfect fit with our detailed size charts. Measurements are in inches unless noted.
          </p>
        </div>

        <div className="space-y-10">
          {sizeTables.map((table, i) => (
            <motion.div
              key={table.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <h2 className="font-semibold text-lg mb-4">{table.category}</h2>
              <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                      {Object.keys(table.sizes[0]).map((key) => (
                        <th
                          key={key}
                          className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 capitalize whitespace-nowrap"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.sizes.map((row, j) => (
                      <tr
                        key={j}
                        className="border-t border-zinc-100 dark:border-zinc-700/50"
                      >
                        {Object.values(row).map((val, k) => (
                          <td
                            key={k}
                            className="px-4 py-3 whitespace-nowrap text-zinc-700 dark:text-zinc-300"
                          >
                            {val || "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 sm:p-8">
          <h2 className="font-semibold text-lg mb-3">How to Measure</h2>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><strong className="text-zinc-900 dark:text-zinc-100">Chest:</strong> Measure around the fullest part of your chest, keeping the tape parallel to the floor.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Waist:</strong> Measure around your natural waistline, keeping the tape snug but not tight.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Hip:</strong> Measure around the fullest part of your hips, about 8 inches below your waist.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Inseam:</strong> Measure from the top of your inner thigh to the bottom of your ankle.</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
