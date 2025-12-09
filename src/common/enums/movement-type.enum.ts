import { registerEnumType } from '@nestjs/graphql';

export enum MovementType {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
}

registerEnumType(MovementType, { name: 'MovementType' });
