"use client";

import { Container, Grid, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "@/store/useCart";
import { notifications } from "@mantine/notifications";
import { CartForm } from "@/components/CartForm";
import { CartSummary } from "@/components/CartSummary";
import { createOrder } from "@/api/orders";
import { ICreateOrder, OrderItem } from "@/types/order";
import { useCoupon } from "@/hooks/useCoupon";
import { useCartSummary } from "@/hooks/useCartSummary";

interface CartFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCart();

  const {
    code: couponCode,
    setCode: setCouponCode,
    percent: discountPercent,
    loading: isValidating,
    apply: handleApplyCoupon,
    resetCoupon,
  } = useCoupon();

  const { discountAmount, finalPrice } = useCartSummary(
    getTotalPrice(),
    discountPercent,
  );

  const form = useForm<CartFormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validate: {
      name: (v) => (v.length < 2 ? "Too short" : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
      phone: (v) => (/^\+?380\d{9}$/.test(v) ? null : "Format error"),
      address: (v) => (v.length < 5 ? "Too short" : null),
    },
  });

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Your order has been placed",
        color: "green",
      });
      clearCart();
      form.reset();
      resetCoupon();
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: `${error}`,
        color: "red",
      });
    },
  });

  const handleSubmit = (values: CartFormValues) => {
    if (items.length === 0) {
      notifications.show({
        title: "Error",
        message: "Cart is empty",
        color: "red",
      });
      return;
    }

    const orderPayload: ICreateOrder = {
      userName: values.name,
      userEmail: values.email,
      userAdress: values.address,
      userPhone: values.phone,
      totalPrice: finalPrice,
      shopId: items[0]?.shopId || "",
      items: items.map(
        (item): OrderItem => ({
          productId: item.id,
          quantity: item.quantity,
          priceAtPurchase: item.price,
        }),
      ),
    };

    mutation.mutate(orderPayload);
  };

  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="xl">
        Shopping Cart
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <CartForm form={form} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <CartSummary
              items={items}
              onUpdate={updateQuantity}
              onRemove={removeItem}
              finalPrice={finalPrice}
              isPending={mutation.isPending}
              couponProps={{
                code: couponCode,
                setCode: setCouponCode,
                apply: handleApplyCoupon,
                loading: isValidating,
                discountPercent: discountPercent,
                discountAmount: discountAmount,
              }}
            />
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}
