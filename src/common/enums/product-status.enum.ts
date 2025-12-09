import { registerEnumType } from '@nestjs/graphql';

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  IN_REPAIR = 'IN_REPAIR',
}

registerEnumType(ProductStatus, { name: 'ProductStatus' });
