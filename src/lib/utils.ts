export function cn(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatPrice(price: number | null | undefined): string {
  if (price == null || isNaN(price)) return "৳0";
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function getImageUrl(seed: string, w = 600, h = 600): string {
  return `https://placehold.co/${w}x${h}?text=${seed}`;
}

export function safeImage(images: string[] | undefined | null, fallback = '/placeholder.svg'): string {
  return images?.[0] || fallback;
}

export function getCategoryImage(category: string): string {
  return `https://placehold.co/800x600?text=${category.toLowerCase().replace(/\s+/g, "+")}`;
}

export function getAvatarUrl(name: string): string {
  return `https://placehold.co/100x100?text=${name.split(" ")[0]}`;
}
