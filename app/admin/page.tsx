"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ShoppingCart, Users, DollarSign, AlertTriangle, ArrowUpRight } from "lucide-react";
import { fetchDashboard, type DashboardStats } from "@/src/lib/admin-api";
import { StatsCard } from "@/src/components/admin/StatsCard";
import { StatusBadge } from "@/src/components/admin/StatusBadge";
import { formatPrice, formatDate } from "@/src/lib/utils";

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .catch(() => {
        const session = localStorage.getItem("admin_session");
        if (!session) window.location.href = "/admin/login";
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const stats = [
    { title: "Total Products", value: data?.stats.totalProducts ?? 0, icon: Package, color: "text-emerald-500" },
    { title: "Total Orders", value: data?.stats.totalOrders ?? 0, icon: ShoppingCart, color: "text-blue-500" },
    { title: "Total Users", value: data?.stats.totalUsers ?? 0, icon: Users, color: "text-purple-500" },
    { title: "Revenue", value: formatPrice(data?.stats.totalRevenue ?? 0), icon: DollarSign, color: "text-amber-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Overview of your store</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <StatsCard key={s.title} {...s} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {(data?.recentOrders ?? []).length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">No orders yet</p>
            ) : (
              (data?.recentOrders ?? []).map((order) => { const o = order as Record<string, unknown>; return (
                <div key={o.id as string} className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-700/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">#{String(o.id).slice(0, 8)}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(o.created_at as string)}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={o.status as string} />
                    <p className="text-sm font-medium mt-1">{formatPrice(o.total as number)}</p>
                  </div>
                </div>
              ); })
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Low Stock Products</h2>
            <Link href="/admin/products" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
              Manage <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {(data?.lowStockProducts ?? []).length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">All products are well stocked</p>
            ) : (
              (data?.lowStockProducts ?? []).map((product) => { const p = product as Record<string, unknown>; return (
                <div key={p.id as string} className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-700/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{p.name as string}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">{p.stock as string}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(p.price as number)}</p>
                </div>
              ); })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
