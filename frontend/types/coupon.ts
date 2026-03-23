export interface Coupon {
  code: string;
  discount: number;
}

export interface CouponValidationResponse {
  valid: boolean;
  discountValue: number;
  message?: string;
}
