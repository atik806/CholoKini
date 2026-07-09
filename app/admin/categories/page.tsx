"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import { fetchCategories } from "@/src/lib/api";
import { CategoryForm, type CategoryFormData } from "@/src/components/admin/CategoryForm";
import { adminFetcher } from "@/src/lib/admin-api";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  description: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (data: CategoryFormData) => {
    setSubmitting(true);
    try {
      await adminFetcher("/categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data: CategoryFormData) => {
    if (!editingId) return;
    setSubmitting(true);
    try {
      await adminFetcher(`/categories/${editingId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (category: CategoryItem) => {
    if (!window.confirm(`Are you sure you want to delete "${category.name}"?`)) return;
    try {
      await adminFetcher(`/categories/${category.slug}`, { method: "DELETE" });
      await load();
    } catch {
      alert("Failed to delete category");
    }
  };

  const openCreate = () => {
    setEditingCategory(null);
    setEditingId(null);
    setFormOpen(true);
  };

  const openEdit = (category: CategoryItem) => {
    setEditingCategory(category);
    setEditingId(category.slug);
    setFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-2xl p-6 text-center">{error}</div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold">Categories</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage your product categories</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Name</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Products</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Description</th>
                <th className="text-right px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-zinc-500 dark:text-zinc-400">No categories found</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-zinc-100 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {cat.image && (
                          <div className="relative w-10 h-10 shrink-0">
                            <Image
                              src={cat.image}
                              alt={cat.name}
                              fill
                              className="rounded-lg object-cover"
                              sizes="40px"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                            />
                          </div>
                        )}
                        <span className="font-medium">{cat.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">{cat.slug}</td>
                    <td className="px-4 py-3">{cat.productCount}</td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 max-w-xs truncate">{cat.description}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(cat)}
                          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-500 hover:text-primary"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-zinc-500 hover:text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingCategory(null); setEditingId(null); }}
        onSubmit={editingCategory ? handleUpdate : handleCreate}
        initialData={editingCategory ? {
          name: editingCategory.name,
          slug: editingCategory.slug,
          description: editingCategory.description,
          image_url: editingCategory.image,
        } : undefined}
        loading={submitting}
      />
    </div>
  );
}
