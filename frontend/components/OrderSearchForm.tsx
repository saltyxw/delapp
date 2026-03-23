import {
  Card,
  Group,
  TextInput,
  Button,
  Stack,
  Divider,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface OrderSearchFormProps {
  onSearch: (values: {
    email: string;
    phone: string;
    orderId?: string;
  }) => void;
}

export function OrderSearchForm({ onSearch }: OrderSearchFormProps) {
  const form = useForm({
    initialValues: {
      email: "",
      phone: "",
      orderId: "",
    },
    validate: {
      email: (value, values) =>
        !values.orderId && !/^\S+@\S+$/.test(value) ? "Invalid email" : null,
      phone: (value, values) =>
        !values.orderId && !value ? "Phone is required" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    if (values.orderId.trim() || (values.email && values.phone)) {
      onSearch(values);
    }
  };

  return (
    <Card withBorder radius="md" mb="xl" shadow="sm">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Text size="sm" fw={500}>
            Find by Order ID
          </Text>
          <Group align="flex-end">
            <TextInput
              placeholder="Enter Order ID"
              style={{ flex: 1 }}
              {...form.getInputProps("orderId")}
            />
          </Group>

          <Divider labelPosition="center" />

          <Group align="flex-end">
            <TextInput
              label="Email"
              style={{ flex: 1 }}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Phone"
              placeholder="+380"
              style={{ flex: 1 }}
              {...form.getInputProps("phone")}
            />
          </Group>

          <Button type="submit" fullWidth variant="filled" color="blue" mt="md">
            Search Orders
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
