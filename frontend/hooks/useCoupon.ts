import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { validateCoupon } from "@/api/coupons";

export function useCoupon() {
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const apply = async () => {
    if (!code) return;

    setLoading(true);
    try {
      const res = await validateCoupon(code.trim().toUpperCase());

      if (res.valid) {
        setPercent(res.discountValue);
        notifications.show({
          title: "Coupon is activated",
          message: `Discount ${res.discountValue}% is activated`,
          color: "green",
        });
      } else {
        setPercent(0);
        notifications.show({
          title: "Error",
          message: res.message || "Wrong coupon",
          color: "red",
        });
      }
    } catch (err) {
      setPercent(0);
      notifications.show({
        title: "Error",
        message: err instanceof Error ? err.message : "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetCoupon = () => {
    setCode("");
    setPercent(0);
  };

  return {
    code,
    setCode,
    percent,
    loading,
    apply,
    resetCoupon,
  };
}
