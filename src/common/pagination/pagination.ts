import { PaginatedResponse } from '~/common/pagination/interfaces/pagination.interface';

export class PaginationHelper {
  static build<T>(data: T[], total: number, page: number, limit: number): PaginatedResponse<T> {
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
      page,
      limit,
      items: data,
    };
  }
}
