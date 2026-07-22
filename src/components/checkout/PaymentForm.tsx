"use client";

import { ShieldCheck } from "lucide-react";

export function PaymentForm() {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-extrabold text-[#132A3A]">Payment Method</h2>
      <div className="bg-[#FBF6EC] rounded-[3px] p-6 border-2 border-[#E7DCC4]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[2px] bg-[#1F6F50] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-serif font-bold text-sm text-[#132A3A]">Cash on Delivery</p>
            <p className="font-mono text-xs text-[#1F6F50] font-bold">Pay when you receive your order</p>
          </div>
        </div>
      </div>
    </div>
  );
}
