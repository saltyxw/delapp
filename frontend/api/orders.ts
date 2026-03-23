import { api } from "./client";
import { ICreateOrder, OrderHistoryResponse } from "@/types/order";

export const createOrder = async (
  orderData: ICreateOrder,
): Promise<{ id: string }> => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

export const getOrdersHistory = async (
  email: string,
  phone: string,
): Promise<OrderHistoryResponse[]> => {
  const { data } = await api.get<OrderHistoryResponse[]>("/orders/history", {
    params: { email, phone },
  });
  return data;
};

export const getOrderById = async (
  id: string,
): Promise<OrderHistoryResponse | null> => {
  try {
    const { data } = await api.get<OrderHistoryResponse>(`/orders/${id}`);
    return data;
  } catch (er) {
    console.log(er);
    return null;
  }
};
