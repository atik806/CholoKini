"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";

const faqs = [
  {
    category: "Orders",
    questions: [
      { q: "How do I place an order?", a: "Simply browse our catalog, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase." },
      { q: "Can I modify or cancel my order?", a: "You can cancel pending orders from your order history. Once an order is confirmed or shipped, modifications are no longer possible." },
      { q: "How will I know my order is confirmed?", a: "You'll receive a confirmation email with your order details and tracking information once your order is placed." },
    ],
  },
  {
    category: "Payment",
    questions: [
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are securely processed." },
      { q: "Is it safe to use my credit card?", a: "Yes, our site uses SSL encryption to protect your payment information. We never store your full card details." },
      { q: "Do you offer installment payments?", a: "Currently we do not offer installment payments, but we're working on adding this option in the future." },
    ],
  },
  {
    category: "Shipping",
    questions: [
      { q: "How long does shipping take?", a: "Standard shipping takes 5-8 business days. Express shipping takes 2-3 business days, and next-day delivery is available for orders placed before 12 PM EST." },
      { q: "Do you ship internationally?", a: "Yes, we ship to select international destinations. International shipping costs and times vary by location." },
      { q: "How can I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account." },
    ],
  },
  {
    category: "Returns",
    questions: [
      { q: "What is your return policy?", a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging." },
      { q: "How long do refunds take?", a: "Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method." },
      { q: "Can I exchange an item?", a: "Yes, exchanges are free. Contact our support team to start an exchange, and we'll provide a prepaid return label." },
    ],
  },
  {
    category: "Account",
    questions: [
      { q: "How do I create an account?", a: "Click the account icon in the header and select 'Register'. Enter your name, email, and a secure password to get started." },
      { q: "I forgot my password, what should I do?", a: "On the login page, click 'Forgot Password' and enter your email. We'll send you a link to reset your password." },
      { q: "How do I update my profile?", a: "Sign in to your account and go to your profile settings. You can update your name, email, and shipping address there." },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const flatFaqs = faqs.flatMap((cat) =>
    cat.questions.map((q) => ({ ...q, category: cat.category }))
  );

  const filtered = search.trim()
    ? flatFaqs.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      )
    : flatFaqs;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-8"
    >
      <Breadcrumbs items={[{ label: "FAQ" }]} />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg mx-auto">
            Find answers to common questions about ordering, shipping, returns, and more.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 mb-8 max-w-md mx-auto">
          <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="flex-1 bg-transparent py-3 text-sm outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          />
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-10">No results found for &quot;{search}&quot;</p>
          ) : (
            filtered.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex items-center justify-between w-full px-6 py-4 text-left"
                >
                  <div>
                    <p className="text-xs text-primary dark:text-primary-light font-medium mb-0.5">{item.category}</p>
                    <span className="text-sm font-medium">{item.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
