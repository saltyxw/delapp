import {
  Card,
  Stack,
  Text,
  Group,
  Button,
  TextInput,
  Divider,
  Title,
} from "@mantine/core";
import { CartItem as CartItemComponent } from "./CartItem";
import { CartItemData } from "@/types/product";

interface CartSummaryProps {
  items: CartItemData[];
  couponProps: {
    code: string;
    setCode: (v: string) => void;
    apply: () => void;
    loading: boolean;
    discountPercent: number;
    discountAmount: number;
  };
  finalPrice: number;
  isPending: boolean;
  onUpdate: (id: string, q: number) => void;
  onRemove: (id: string) => void;
}

export function CartSummary({
  items,
  couponProps,
  finalPrice,
  isPending,
  onUpdate,
  onRemove,
}: CartSummaryProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack gap="md">
        {items.length > 0 ? (
          items.map((item) => (
            <CartItemComponent
              key={item.id}
              item={item}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))
        ) : (
          <Text ta="center" py="xl" c="dimmed">
            Your cart is empty
          </Text>
        )}
      </Stack>

      {items.length > 0 && (
        <>
          <Divider my="lg" label="Promocode" labelPosition="center" />
          <Group align="flex-end" mb="xl">
            <TextInput
              label="Coupon"
              placeholder="ENTER CODE"
              value={couponProps.code}
              onChange={(e) => couponProps.setCode(e.currentTarget.value)}
              style={{ flex: 1 }}
            />
            <Button
              variant="light"
              onClick={couponProps.apply}
              loading={couponProps.loading}
            >
              Apply
            </Button>
          </Group>
        </>
      )}

      <Group justify="space-between" mt="xl">
        <Stack gap={0}>
          <Text size="sm" c="dimmed">
            Total Amount:
          </Text>
          {couponProps.discountPercent > 0 && (
            <Text size="xs" c="green" fw={500}>
              Discount: -{couponProps.discountAmount} грн (
              {couponProps.discountPercent}%)
            </Text>
          )}
          <Title order={3}>{finalPrice} ₴</Title>
        </Stack>

        <Button
          type="submit"
          size="lg"
          radius="md"
          loading={isPending}
          disabled={items.length === 0}
        >
          Place Order
        </Button>
      </Group>
    </Card>
  );
}
