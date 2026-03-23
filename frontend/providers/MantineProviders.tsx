"use client";

import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { Notifications } from "@mantine/notifications";

export function MantineProviders({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" zIndex={1000} />
      {children}
    </MantineProvider>
  );
}
