"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Eye, EyeOff } from "lucide-react";
import { DataTable, type Column } from "@/src/components/admin/DataTable";
import { formatDate } from "@/src/lib/utils";
import { fetchContactMessages, markMessageRead, type ContactMessage } from "@/src/lib/admin-api";

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 20, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await fetchContactMessages({ page, limit: 20 });
      setMessages(res.messages);
      setMeta(res.meta);
    } catch {
      // handled by adminFetcher 401 redirect
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(1); }, [load]);

  const handleMarkRead = async (msg: ContactMessage) => {
    if (msg.is_read) return;
    try {
      await markMessageRead(msg.id);
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, is_read: true } : m));
    } catch {
      // handled by adminFetcher 401 redirect
    }
  };

  const columns: Column<ContactMessage>[] = [
    {
      key: "status",
      label: "",
      render: (msg) => (
        <button
          onClick={() => handleMarkRead(msg)}
          className={`p-1.5 rounded-lg transition-colors ${
            msg.is_read
              ? "text-zinc-300 dark:text-zinc-600"
              : "text-primary hover:bg-primary/10"
          }`}
          title={msg.is_read ? "Read" : "Mark as read"}
        >
          {msg.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (msg) => (
        <div>
          <p className={`font-medium ${!msg.is_read ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`}>
            {msg.first_name} {msg.last_name}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{msg.email}</p>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (msg) => (
        <span className={`max-w-xs block truncate ${!msg.is_read ? "font-medium text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-300"}`}>
          {msg.subject}
        </span>
      ),
    },
    {
      key: "message",
      label: "Message",
      render: (msg) => {
        const truncated = msg.message.length > 80 ? msg.message.slice(0, 80) + "..." : msg.message;
        return (
          <span className="text-zinc-500 dark:text-zinc-400 max-w-sm block truncate" title={msg.message}>
            {truncated}
          </span>
        );
      },
    },
    {
      key: "created_at",
      label: "Date",
      render: (msg) => (
        <span className="text-zinc-500 dark:text-zinc-400 text-sm">{formatDate(msg.created_at)}</span>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold">Contact Messages</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Messages from the contact form ({meta.total} total, {messages.filter((m) => !m.is_read).length} unread)
          </p>
        </div>
      </div>

      <DataTable<ContactMessage>
        columns={columns}
        data={messages}
        keyExtractor={(m) => m.id}
        loading={loading}
        pagination={{
          page: meta.page,
          totalPages: meta.totalPages,
          onPageChange: (page) => load(page),
        }}
      />
    </motion.div>
  );
}
