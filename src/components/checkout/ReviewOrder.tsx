"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useCartStore } from "@/src/store/useCartStore";
import { formatPrice as fp, safeImage } from "@/src/lib/utils";
import { DELIVERY_CHARGES, type DeliveryZone } from "@/src/lib/constants";
import type { ShippingFormValues } from "./ShippingForm";

interface ReviewOrderProps {
  shipping: ShippingFormValues;
  deliveryZone: DeliveryZone;
}

export function ReviewOrder({ shipping, deliveryZone }: ReviewOrderProps) {
  const items = useCartStore((s) => s.items);

  const computedTotal = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.price || 0) * item.quantity,
      0
    );
    const shipping = DELIVERY_CHARGES[deliveryZone];
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [items, deliveryZone]);

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-extrabold text-[#132A3A]">Review Your Order</h2>

      <div className="bg-[#FBF6EC] rounded-[3px] p-4 border border-[#E7DCC4] space-y-1 font-mono text-xs">
        <h3 className="font-serif font-bold text-sm text-[#132A3A] mb-2">Shipping To</h3>
        <p className="text-[#1C1A17]/80">
          {shipping.firstName} {shipping.lastName}
        </p>
        <p className="text-[#1C1A17]/80">{shipping.address}</p>
        <p className="text-[#1C1A17]/80">
          {shipping.city}, {shipping.zipCode}
        </p>
        <p className="text-[#1C1A17]/80">{shipping.email}</p>
        <p className="text-[#1C1A17]/80">{shipping.phone}</p>
      </div>

      <div className="bg-[#FBF6EC] rounded-[3px] p-4 border border-[#E7DCC4] space-y-1 font-mono text-xs">
        <h3 className="font-serif font-bold text-sm text-[#132A3A] mb-2">Payment</h3>
        <p className="text-[#1F6F50] font-bold">Cash on Delivery</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
            className="flex items-center gap-3 bg-[#FBF6EC] rounded-[3px] p-3 border border-[#E7DCC4]"
          >
            <div className="w-14 h-14 rounded-[2px] overflow-hidden bg-[#FBF6EC] border border-[#E7DCC4] shrink-0 relative">
              <Image
                src={safeImage(item.product.images)}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif font-bold text-sm text-[#132A3A] line-clamp-1">
                {item.product.name}
              </p>
              <p className="font-mono text-[11px] text-[#132A3A]/70">Qty: {item.quantity}</p>
            </div>
            <p className="font-mono text-sm font-bold text-[#1F6F50]">
              {fp(item.product.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-[#E7DCC4] pt-3 space-y-1 font-mono text-xs">
        <div className="flex justify-between text-[#1C1A17]/80">
          <span>Subtotal</span>
          <span className="font-bold">{fp(computedTotal.subtotal)}</span>
        </div>
        <div className="flex justify-between text-[#1C1A17]/80">
          <span>Delivery ({deliveryZone === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
          <span className="font-bold">{fp(computedTotal.shipping)}</span>
        </div>
        <div className="flex justify-between font-extrabold text-base text-[#132A3A] pt-1 border-t border-[#E7DCC4]">
          <span>Total</span>
          <span className="text-[#1F6F50]">{fp(computedTotal.total)}</span>
        </div>
      </div>
    </div>
  );
}
