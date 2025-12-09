import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gender } from '~/common/enums/gender.enum';
import { Role } from '~/common/enums/role.enum';
import { Status } from '~/common/enums/status.enum';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Gender)
  gender: Gender;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
