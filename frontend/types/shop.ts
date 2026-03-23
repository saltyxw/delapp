export type Shop = {
  id: string;
  name: string;
  rating: number;
};

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}
