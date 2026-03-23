import { Card, Image, Group, Text, Badge, Button, Stack } from "@mantine/core";
import { Product } from "@/types/product";

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Card.Section>
        {product.image ? (
          <Image src={product.image} height={160} alt={product.name} />
        ) : (
          <div style={{ height: 160, background: "#f1f3f5" }} />
        )}
      </Card.Section>

      <Stack justify="space-between" mt="md" style={{ flex: 1 }}>
        <div>
          <Group justify="space-between" mb="xs">
            <Text fw={600} lineClamp={2}>
              {product.name}
            </Text>
            <Badge color="green" variant="light">
              {product.price} грн
            </Badge>
          </Group>

          <Text size="sm" c="dimmed" mb="sm">
            {product.category.name}
          </Text>
        </div>

        <Button fullWidth radius="md" onClick={() => onAdd(product)}>
          Add to Cart
        </Button>
      </Stack>
    </Card>
  );
}
