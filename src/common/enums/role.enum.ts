import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

registerEnumType(Role, { name: 'Role' });
