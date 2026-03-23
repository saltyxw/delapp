"use client";

import { ScrollArea, Stack, Text, Button, Box } from "@mantine/core";

interface Shop {
  id: string;
  name: string;
  rating: number;
}

interface ShopSidebarProps {
  shops: Shop[];
  activeShop: string | null;
  onShopSelect: (id: string) => void;
  children?: React.ReactNode;
}

export function ShopSidebar({
  shops,
  activeShop,
  onShopSelect,
  children,
}: ShopSidebarProps) {
  return (
    <ScrollArea h="100%">
      <Stack gap="lg">
        <Box>
          <Text fw={700} mb="sm" size="lg">
            Shops
          </Text>
          <Stack gap="xs">
            {shops.map((shop) => (
              <Button
                key={shop.id}
                variant={activeShop === shop.id ? "filled" : "light"}
                onClick={() => onShopSelect(shop.id)}
                fullWidth
                justify="flex-start"
              >
                {shop.name} ({shop.rating}⭐)
              </Button>
            ))}
          </Stack>
        </Box>

        {children}
      </Stack>
    </ScrollArea>
  );
}
