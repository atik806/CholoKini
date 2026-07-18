"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/src/store/useCartStore";
import { useIsLoggedIn, useAuthHydrated, useAuthStore } from "@/src/store/useAuthStore";
import { Button } from "@/src/components/ui/Button";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { ShippingForm } from "@/src/components/checkout/ShippingForm";
import type { ShippingFormValues } from "@/src/components/checkout/ShippingForm";
import { PaymentForm } from "@/src/components/checkout/PaymentForm";
import { ReviewOrder } from "@/src/components/checkout/ReviewOrder";
import { OrderComplete } from "@/src/components/checkout/OrderComplete";
import { API_BASE, type DeliveryZone } from "@/src/lib/constants";
import { authFetch } from "@/src/lib/auth-api";

export default function CheckoutPage() {
  const router = useRouter();
  const authHydrated = useAuthHydrated();
  const isLoggedIn = useIsLoggedIn();
  const user = useAuthStore((s) => s.user);
  const [completed, setCompleted] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [placeError, setPlaceError] = useState("");
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [shipping, setShipping] = useState<ShippingFormValues>({
    firstName: user?.shipping_address?.firstName || "",
    lastName: user?.shipping_address?.lastName || "",
    email: user?.shipping_address?.email || user?.email || "",
    phone: user?.shipping_address?.phone || "",
    address: user?.shipping_address?.address || "",
    city: user?.shipping_address?.city || "",
    zipCode: user?.shipping_address?.zipCode || "",
  });
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>("inside_dhaka");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (authHydrated && !isLoggedIn) {
      router.replace("/login?redirect=/checkout");
    }
  }, [authHydrated, isLoggedIn, router]);

  const outOfStockInCart = useMemo(
    () => items.filter((i) => i.product.stock === "out-of-stock"),
    [items],
  );

  const handlePlaceOrder = useCallback(async () => {
    const errs: Record<string, string> = {};
    if (!shipping.firstName.trim()) errs.firstName = "Required";
    if (!shipping.lastName.trim()) errs.lastName = "Required";
    if (!shipping.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) errs.email = "Invalid email";
    if (!shipping.phone.trim()) errs.phone = "Required";
    if (!shipping.address.trim()) errs.address = "Required";
    if (!shipping.city.trim()) errs.city = "Required";
    if (!shipping.zipCode.trim()) errs.zipCode = "Required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (outOfStockInCart.length > 0) {
      setPlaceError(
        `Remove out-of-stock items before checkout: ${outOfStockInCart.map((i) => i.product.name).join(", ")}`,
      );
      return;
    }
    setPlacing(true);
    setPlaceError("");
    try {
      const body = {
        shipping_address: shipping,
        payment_method: "cod",
        delivery_zone: deliveryZone,
        items: items.map((i) => ({
          product_id: i.product.id,
          product_name: i.product.name,
          product_image: i.product.images?.[0] || null,
          price: i.product.price,
          quantity: i.quantity,
          selected_size: i.selectedSize || null,
          selected_color: i.selectedColor || null,
        })),
      };
      const res = await authFetch(`${API_BASE}/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to place order");
      }
      useAuthStore.getState().updateUser({ shipping_address: shipping });
      clearCart();
      setCompleted(true);
    } catch (e) {
      setPlaceError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setPlacing(false);
    }
  }, [shipping, deliveryZone, items, clearCart, outOfStockInCart]);

  if (!authHydrated || !isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (items.length === 0 && !completed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container"
      >
        <Breadcrumbs items={[{ label: "Checkout" }]} />
        <EmptyState
          title="Your cart is empty"
          description="Add some items before checking out."
          actionLabel="Start Shopping"
          actionHref="/shop"
        />
      </motion.div>
    );
  }

  if (completed) {
    return <OrderComplete />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-8"
    >
      <Breadcrumbs items={[{ label: "Checkout" }]} />

      {outOfStockInCart.length > 0 && (
        <p className="max-w-lg mx-auto mb-6 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 text-center">
          Some items in your cart are out of stock. Remove them in{" "}
          <Link href="/cart" className="underline font-medium">your cart</Link>{" "}
          to continue.
        </p>
      )}

      <div className="max-w-lg mx-auto space-y-10">
        <section>
          <ShippingForm
            values={shipping}
            onChange={setShipping}
            errors={errors}
            deliveryZone={deliveryZone}
            onDeliveryZoneChange={setDeliveryZone}
          />
        </section>

        <section>
          <PaymentForm />
        </section>

        <section>
          <ReviewOrder
            shipping={shipping}
            deliveryZone={deliveryZone}
          />
        </section>
      </div>

      <div className="max-w-lg mx-auto mt-8 space-y-3">
        {placeError && (
          <p className="text-sm text-red-500 text-center">{placeError}</p>
        )}
        <Button
          className="w-full"
          size="lg"
          onClick={handlePlaceOrder}
          disabled={placing || outOfStockInCart.length > 0}
        >
          {placing ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Placing Order...</>
          ) : (
            <>Place Order <Sparkles className="w-5 h-5" /></>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
