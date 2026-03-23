import { api } from "./client";
import { Shop } from "@/types/shop";
import { Product } from "@/types/product";
import { PaginatedResponse } from "@/types/shop";

export const getShops = async (page = 1, limit = 9) => {
  const { data } = await api.get<PaginatedResponse<Shop>>("/shops", {
    params: { page, limit },
  });
  return data;
};

export const getShopProducts = async (shopId: string, page = 1) => {
  const { data } = await api.get<PaginatedResponse<Product & { imageUrl?: string | null }>>(
    `/shops/${shopId}/products`,
    {
      params: { page, limit: 12 },
    },
  );

  // Prisma повертає `imageUrl`, а фронт очікує `image`.
  return {
    ...data,
    items: data.items.map((p) => ({
      ...p,
      image: (p as any).imageUrl ?? null,
    })),
  };
};

export const getCategories = async () => {
  const { data } = await api.get("/shops/categories");
  return data;
};
