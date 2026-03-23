"use client";

import { useState, useEffect } from "react";
import { Container, Group, Title, Button, Burger } from "@mantine/core";
import Link from "next/link";

interface HeaderProps {
  opened?: boolean;
  toggle?: () => void;
}

export function Header({ opened, toggle }: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Якщо ми на сервері, рендеримо мінімальний сталий HTML
  // Це запобігає помилці "auth of e" під час гідратації
  if (!mounted) {
    return (
      <Container size="xl" h={70}>
        <Group h="100%" px="md">
          <Title order={3} c="blue" size="h4">
            Delivery
          </Title>
        </Group>
      </Container>
    );
  }

  const getVariant = (_path: string) => "subtle";

  return (
    <Container size="xl" h="100%">
      <Group
        gap={8}
        wrap="nowrap"
        style={{
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          flex: 1,
        }}
      >
        <Group gap="xs" wrap="nowrap">
          {toggle && (
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          )}
          <Title
            order={3}
            c="blue"
            style={{ textDecoration: "none", whiteSpace: "nowrap" }}
            size="h4"
          >
            Delivery
          </Title>
        </Group>

        <Group
          wrap="nowrap"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            gap: "var(--mantine-spacing-xs)",
          }}
        >
          <Button
            component={Link}
            href="/"
            variant={getVariant("/")}
            size="xs"
            px={10}
          >
            Shops
          </Button>
          <Button
            component={Link}
            href="/cart"
            variant={getVariant("/cart")}
            size="xs"
            px={10}
          >
            Cart
          </Button>
          <Button
            component={Link}
            href="/history"
            variant={getVariant("/history")}
            size="xs"
            px={10}
          >
            History
          </Button>
          <Button
            component={Link}
            href="/coupons"
            variant={getVariant("/coupons")}
            size="xs"
            px={10}
          >
            Coupons
          </Button>
        </Group>
      </Group>
    </Container>
  );
}
