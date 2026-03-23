"use client";

import { Container, Title, Stack, Text, Center, Loader } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderSearchForm } from "@/components/OrderSearchForm";
import { OrderItem as OrderItemCard } from "@/components/OrderItem";
import { getOrdersHistory, getOrderById } from "@/api/orders";
import { OrderHistoryResponse } from "@/types/order";

export default function HistoryPage() {
  const [searchParams, setSearchParams] = useState<{
    email?: string;
    phone?: string;
    orderId?: string;
  } | null>(null);

  const {
    data: orders,
    isFetching,
    error,
  } = useQuery<OrderHistoryResponse[]>({
    queryKey: ["orders-history", searchParams],
    queryFn: async () => {
      if (!searchParams) return [];

      if (searchParams.orderId?.trim()) {
        const singleOrder = await getOrderById(searchParams.orderId.trim());
        return singleOrder ? [singleOrder] : [];
      }

      if (searchParams.email && searchParams.phone) {
        return getOrdersHistory(searchParams.email, searchParams.phone);
      }

      return [];
    },
    enabled: !!searchParams,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (values: {
    email: string;
    phone: string;
    orderId?: string;
  }) => {
    if (
      !values.email?.trim() &&
      !values.phone?.trim() &&
      !values.orderId?.trim()
    )
      return;
    setSearchParams(values);
  };

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="lg">
        Order History
      </Title>
      <OrderSearchForm onSearch={handleSearch} />

      <Stack gap="lg" mt="xl">
        {isFetching ? (
          <Center py="xl">
            <Loader size="lg" variant="dots" />
          </Center>
        ) : error ? (
          <Center py="xl">
            <Text c="red">Error</Text>
          </Center>
        ) : orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderItemCard
              key={order.id}
              orderId={order.id}
              date={
                order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""
              }
              products={
                order.orderItems?.map((item) => ({
                  productId: item.productId,
                  name: item.product?.name ?? `Product ID ${item.productId}`,
                  quantity: item.quantity,
                  price: item.priceAtPurchase,
                  shopId: item.product?.shopId ?? "",
                  category: item.product?.category ?? null,
                  image: item.product?.imageUrl ?? null,
                })) || []
              }
              total={order.totalPrice}
            />
          ))
        ) : (
          orders && (
            <Center py="xl">
              <Text c="dimmed">No orders</Text>
            </Center>
          )
        )}
      </Stack>
    </Container>
  );
}
