import { api } from "./client";
import { Coupon, CouponValidationResponse } from "@/types/coupon";

export const getAllCoupons = async (): Promise<Coupon[]> => {
  const { data } = await api.get<Coupon[]>("/coupons");
  return data;
};

export const validateCoupon = async (
  code: string,
): Promise<CouponValidationResponse> => {
  const { data } = await api.get<CouponValidationResponse>(
    `/coupons/validate`,
    {
      params: { code },
    },
  );
  return data;
};
