import {
  Paper,
  Group,
  Image,
  Stack,
  Text,
  NumberInput,
  ActionIcon,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { CartItemData } from "@/types/product";

interface CartItemProps {
  item: CartItemData;
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdate, onRemove }: CartItemProps) {
  return (
    <Paper withBorder p="sm" radius="md">
      <Group justify="space-between" wrap="nowrap">
        <Image src={item.image} radius="md" w={80} h={80} alt={item.name} />
        <Stack gap={0} style={{ flex: 1, marginLeft: 10 }}>
          <Text fw={500}>{item.name}</Text>
          <Text size="sm" c="dimmed">
            {item.price} ₴
          </Text>
        </Stack>
        <Group>
          <NumberInput
            w={70}
            min={1}
            value={item.quantity}
            onChange={(val) => onUpdate(item.id, Number(val))}
          />
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => onRemove(item.id)}
          >
            <IconTrash size={20} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
}
