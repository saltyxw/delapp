import { Card, Group, Text, Divider, Stack, Button } from "@mantine/core";
import { useCart } from "@/store/useCart";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface ProductInfo {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  shopId: string;
  category?: {
    id: string;
    name: string;
  } | null;
  image?: string | null;
}

interface OrderItemProps {
  orderId: string;
  date: string;
  products: ProductInfo[];
  total: number;
}

export function OrderItem({ orderId, date, products, total }: OrderItemProps) {
  const { addMany } = useCart();
  const router = useRouter();

  const handleReorder = () => {
    const itemsToCart = products.map((p) => ({
      id: p.productId,
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      image: p.image ?? null,
      shopId: p.shopId,
      category: p.category ?? { id: "", name: "" },
    }));

    addMany(itemsToCart);

    notifications.show({
      title: "Success",
      message: "Order items have been added to cart",
      color: "blue",
    });

    router.push("/cart");
  };

  return (
    <Card withBorder radius="md" shadow="xs" p="lg">
      <Group justify="space-between" mb="xs">
        <Stack gap={0}>
          <Text fw={700} size="lg">
            Order #{orderId.slice(-6).toUpperCase()}
          </Text>
          <Text c="dimmed" size="sm">
            {date}
          </Text>
        </Stack>
        <Button
          variant="light"
          color="blue"
          radius="md"
          onClick={handleReorder}
        >
          Reorder
        </Button>
      </Group>

      <Divider mb="sm" />

      <Stack gap="xs">
        {products.map((product, index) => (
          <Group justify="space-between" key={index}>
            <Text size="sm">
              {product.name}{" "}
              <Text span c="dimmed">
                x{product.quantity}
              </Text>
            </Text>
            <Text fw={500} size="sm">
              {product.price * product.quantity} ₴
            </Text>
          </Group>
        ))}
      </Stack>

      <Divider my="sm" />

      <Group justify="space-between">
        <Text fw={700}>Total Paid:</Text>
        <Text fw={700} c="blue" size="xl">
          {total} грн
        </Text>
      </Group>
    </Card>
  );
}
