import { Card, Title, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface CartFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export function CartForm({
  form,
}: {
  form: UseFormReturnType<CartFormValues>;
}) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        Contact Information
      </Title>
      <Stack>
        <TextInput label="Name" {...form.getInputProps("name")} required />
        <TextInput label="Email" {...form.getInputProps("email")} required />
        <TextInput
          label="Phone"
          placeholder="+380"
          {...form.getInputProps("phone")}
          required
        />
        <TextInput
          label="Address"
          {...form.getInputProps("address")}
          required
        />
      </Stack>
    </Card>
  );
}
