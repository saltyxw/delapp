export type Product = {
  id: string;
  shopId: string;
  name: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
  image: string | null;
};

export type CartItemData = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
};
