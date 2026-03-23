"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import {
  AppShell,
  Box,
  Divider,
  Stack,
  Center,
  Pagination,
  Group,
  Title,
  Select,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useCart } from "@/store/useCart";
import { useShopData } from "@/hooks/useShopData";

import { Header } from "@/components/Header";
import { ShopSidebar } from "@/components/ShopSidebar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/types/product";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function ShopPage() {
  const [mounted, setMounted] = useState(false);
  const [opened, { toggle }] = useDisclosure();

  // Ініціалізуємо хуки
  const addItem = useCart((state) => state.addItem);
  const shopData = useShopData(mounted);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    notifications.show({
      title: "Успіх",
      message: `${product.name} додано до кошика`,
      color: "green",
    });
  };

  if (!mounted) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  const {
    state = {} as any,
    setters = {} as any,
    data = {} as any,
    loading = {} as any,
  } = shopData || {};

  return (
    <ErrorBoundary>
      <AppShell
        header={{ height: 70 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        aside={{
          width: 300,
          breakpoint: "md",
          collapsed: { desktop: false, mobile: true },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Header opened={opened} toggle={toggle} />
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Stack justify="space-between" h="100%">
            <ShopSidebar
              shops={data?.filteredShops || []}
              activeShop={state?.activeShopId}
              onShopSelect={(id) => {
                setters?.setActiveShop?.(id);
                setters?.setProductsPage?.(1);
                if (opened) toggle();
              }}
            >
              <Box hiddenFrom="md">
                <Divider my="md" label="Фільтри" labelPosition="center" />
                <FilterSidebar
                  minRating={state?.minRating}
                  onRatingChange={setters?.setMinRating}
                  selectedCategories={state?.selectedCategories}
                  onCategoriesChange={setters?.setSelectedCategories}
                />
              </Box>
            </ShopSidebar>

            {data?.shopsData?.meta && data.shopsData.meta.lastPage > 1 && (
              <Center pt="sm">
                <Pagination
                  size="xs"
                  total={data.shopsData.meta.lastPage}
                  value={state?.shopsPage}
                  onChange={setters?.setShopsPage}
                />
              </Center>
            )}
          </Stack>
        </AppShell.Navbar>

        <AppShell.Aside p="md" visibleFrom="md">
          <FilterSidebar
            isAside
            minRating={state?.minRating}
            onRatingChange={setters?.setMinRating}
            selectedCategories={state?.selectedCategories}
            onCategoriesChange={setters?.setSelectedCategories}
          />
        </AppShell.Aside>

        <AppShell.Main>
          <Group justify="space-between" align="flex-end" mb="lg">
            <Title order={4}>
              {loading?.isShopsLoading
                ? "Завантаження..."
                : state?.activeShopId
                  ? `Товари магазину ${state?.currentShopName || ""}`
                  : "Оберіть магазин"}
            </Title>
            <Select
              label="Сортування"
              data={[
                { value: "price_asc", label: "Спочатку дешевші" },
                { value: "price_desc", label: "Спочатку дорожчі" },
                { value: "name_az", label: "Назва: А-Я" },
              ]}
              value={state?.sortBy}
              onChange={setters?.setSortBy}
              w={200}
            />
          </Group>

          <ProductGrid
            products={data?.displayedProducts || []}
            isLoading={loading?.isProductsLoading}
            onAddToCart={handleAddToCart}
            pagination={
              data?.productsData?.meta
                ? {
                    total: data.productsData.meta.lastPage,
                    active: state?.productsPage,
                    onChange: setters?.setProductsPage,
                  }
                : null
            }
          />
        </AppShell.Main>
      </AppShell>
    </ErrorBoundary>
  );
}
