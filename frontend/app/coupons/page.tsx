"use client";

import {
  Container,
  Title,
  SimpleGrid,
  Center,
  Loader,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { CouponCard } from "@/components/CouponCard";
import { getAllCoupons } from "@/api/coupons";

export default function CouponsPage() {
  const {
    data: coupons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: getAllCoupons,
  });

  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="xl" ta={{ base: "center", sm: "left" }}>
        Coupons
      </Title>

      {isLoading ? (
        <Center py="xl">
          <Loader size="xl" />
        </Center>
      ) : error ? (
        <Center py="xl">
          <Text c="red">fail</Text>
        </Center>
      ) : coupons && coupons.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.code}
              code={coupon.code}
              discount={coupon.discount}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Center py="xl">
          <Text c="dimmed">No active coupons</Text>
        </Center>
      )}
    </Container>
  );
}
