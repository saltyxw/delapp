// src/app/page.tsx
"use client";
import dynamic from "next/dynamic";
import { Center, Loader } from "@mantine/core";

// Вимикаємо SSR (Server Side Rendering) для всієї логіки магазину
const ShopPageContent = dynamic(() => import("@/components/ShopPageContent"), {
  ssr: false,
  loading: () => (
    <Center h="100vh">
      <Loader size="xl" />
    </Center>
  ),
});

export default function Page() {
  return <ShopPageContent />;
}
