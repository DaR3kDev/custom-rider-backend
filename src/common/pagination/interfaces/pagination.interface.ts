export interface PaginatedResponse<T> {
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  page: number;
  limit: number;
  items: T[];
}
