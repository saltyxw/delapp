import { Stack, Box, Text, Rating, MultiSelect, Title } from "@mantine/core";

interface FilterProps {
  minRating: number;
  onRatingChange: (val: number) => void;
  selectedCategories: string[];
  onCategoriesChange: (val: string[]) => void;
  isAside?: boolean;
}

export function FilterSidebar({
  minRating,
  onRatingChange,
  selectedCategories,
  onCategoriesChange,
  isAside,
}: FilterProps) {
  return (
    <Stack gap="md">
      {isAside && <Title mb="md">Filters</Title>}
      <Box>
        <Text fw={700} mb="xs">
          Minimum Shop Rating
        </Text>
        <Rating value={minRating} onChange={onRatingChange} fractions={2} />
      </Box>

      <MultiSelect
        label="Product Categories"
        data={["Burgers", "Pizza", "Drinks", "Chicken"]}
        value={selectedCategories}
        onChange={onCategoriesChange}
        clearable
      />
    </Stack>
  );
}
