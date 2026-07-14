import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        "Supabase env vars missing. Restart the dev server after adding NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env"
      );
    }
    client = createClient(url, key, {
      auth: {
        detectSessionInUrl: false,
        flowType: "pkce",
        persistSession: false,
        autoRefreshToken: false,
        storage: {
          getItem: (key: string) => {
            try {
              return localStorage.getItem(key);
            } catch {
              return null;
            }
          },
          setItem: (key: string, value: string) => {
            try {
              localStorage.setItem(key, value);
            } catch {}
          },
          removeItem: (key: string) => {
            try {
              localStorage.removeItem(key);
            } catch {}
          },
        },
      },
    });
  }
  return client;
}
