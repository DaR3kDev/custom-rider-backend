import { registerEnumType } from '@nestjs/graphql';

export enum ProductType {
  SPARE = 'SPARE',
  SERVICE = 'SERVICE',
  ACCESSORY = 'ACCESSORY',
  MATERIAL = 'MATERIAL',
}

registerEnumType(ProductType, { name: 'ProductType' });
