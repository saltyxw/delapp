import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getShops, getShopProducts } from "@/api/shops";

export function useShopData(queriesEnabled: boolean = true) {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>("price_asc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [shopsPage, setShopsPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);

  const { data: shopsData, isLoading: isShopsLoading } = useQuery({
    queryKey: ["shops", shopsPage],
    queryFn: () => getShops(shopsPage),
    enabled: queriesEnabled,
  });

  const shops = useMemo(() => shopsData?.items || [], [shopsData]);

  const activeShopId = selectedShopId || shops[0]?.id || null;

  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products", activeShopId, productsPage],
    queryFn: () => getShopProducts(activeShopId!, productsPage),
    enabled: queriesEnabled && !!activeShopId,
  });

  const products = useMemo(() => productsData?.items || [], [productsData]);

  const filteredShops = useMemo(
    () => shops.filter((shop) => shop.rating >= minRating),
    [shops, minRating],
  );

  const displayedProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category.name),
      );
    }

    return result.sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "name_az") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, selectedCategories, sortBy]);

  const currentShopName = useMemo(
    () => shops.find((s) => s.id === activeShopId)?.name || "",
    [shops, activeShopId],
  );

  return {
    state: {
      activeShopId,
      sortBy,
      selectedCategories,
      minRating,
      shopsPage,
      productsPage,
      currentShopName,
    },
    setters: {
      setActiveShop: setSelectedShopId,
      setSortBy,
      setSelectedCategories,
      setMinRating,
      setShopsPage,
      setProductsPage,
    },
    data: { shopsData, productsData, filteredShops, displayedProducts },
    loading: { isShopsLoading, isProductsLoading },
  };
}
