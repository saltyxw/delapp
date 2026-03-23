import { useMemo } from "react";

export function useCartSummary(subtotal: number, discountPercent: number) {
  return useMemo(() => {
    const discountAmount = (subtotal * discountPercent) / 100;
    const finalPrice = subtotal - discountAmount;

    return {
      discountAmount: Number(discountAmount.toFixed(2)),
      finalPrice: Number(finalPrice.toFixed(2)),
      hasDiscount: discountPercent > 0,
      subtotal,
    };
  }, [subtotal, discountPercent]);
}
