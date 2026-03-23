import { api } from "./client";

export const getProductsByShop = async (shopId: string) => {
  const { data } = await api.get(`/products`, {
    params: { shopId },
  });
  return data;
};

export const getShopProducts = async (shopId: string) => {
  const { data } = await api.get(`/shops/${shopId}/products`);
  return data;
};
