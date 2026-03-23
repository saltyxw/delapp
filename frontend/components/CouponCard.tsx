import { Card, Group, Badge, Text, Button } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useState } from "react";

interface CouponProps {
  code: string;
  discount: number;
}

export function CouponCard({ code, discount }: CouponProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card withBorder radius="md" p="lg" shadow="sm">
      <Group justify="space-between" mb="xs">
        <Badge size="xl" color="orange" variant="filled">
          {discount}
        </Badge>
        <Text fw={700} size="xl" c="blue">
          {code}
        </Text>
      </Group>
      <Button
        fullWidth
        variant={copied ? "filled" : "light"}
        color={copied ? "teal" : "blue"}
        leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
        onClick={handleCopy}
      >
        {copied ? "Copied" : "Copy Code"}
      </Button>
    </Card>
  );
}
