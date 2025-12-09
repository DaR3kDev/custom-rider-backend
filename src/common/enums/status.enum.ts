import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

registerEnumType(Status, { name: 'Status' });
