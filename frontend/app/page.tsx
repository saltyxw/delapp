"use client";

import dynamic from "next/dynamic";
import { Center, Loader, Stack, Title } from "@mantine/core";

// Якщо в ShopPageContent використовується export default, то код має бути таким:
const ShopContent = dynamic(
  () => import("@/components/ShopPageContent"), // Прибираємо .then(...)
  {
    ssr: false,
    loading: () => (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="xl" color="blue" />
          <Title order={3}>Завантаження магазину...</Title>
        </Stack>
      </Center>
    ),
  },
);

export default function ShopPage() {
  return <ShopContent />;
}
