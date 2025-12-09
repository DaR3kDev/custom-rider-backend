import { registerEnumType } from '@nestjs/graphql';

export enum InventoryStatus {
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  IN_REPAIR = 'IN_REPAIR',
  ON_HOLD = 'ON_HOLD',
}

registerEnumType(InventoryStatus, { name: 'InventoryStatus' });
