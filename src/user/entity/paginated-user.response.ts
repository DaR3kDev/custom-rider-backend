import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '~/user/entity/user.entity';

@ObjectType()
export class PaginatedUserResponse {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => [User])
  items: User[];
}
