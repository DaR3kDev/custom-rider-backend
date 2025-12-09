import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NOT_SPECIFIED = 'NOT_SPECIFIED',
}

registerEnumType(Gender, {
  name: 'Gender',
});
