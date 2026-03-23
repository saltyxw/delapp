import { SimpleGrid, Center, Loader, Text, Pagination } from "@mantine/core";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  pagination: {
    total: number;
    active: number;
    onChange: (p: number) => void;
  } | null;
  onAddToCart: (p: Product) => void;
}

export function ProductGrid({
  products,
  isLoading,
  pagination,
  onAddToCart,
}: ProductGridProps) {
  if (isLoading)
    return (
      <Center py="xl">
        <Loader size="xl" />
      </Center>
    );

  if (products.length === 0)
    return (
      <Center py="xl">
        <Text c="dimmed">No products found</Text>
      </Center>
    );

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
        ))}
      </SimpleGrid>

      {pagination && pagination.total > 1 && (
        <Center mt="xl" pb="xl">
          <Pagination
            total={pagination.total}
            value={pagination.active}
            onChange={pagination.onChange}
            withEdges
          />
        </Center>
      )}
    </>
  );
}
