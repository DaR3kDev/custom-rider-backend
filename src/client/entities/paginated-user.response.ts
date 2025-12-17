import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Client } from '~/client/entities/client.entity';

@ObjectType()
export class PaginatedClientResponse {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => [Client])
  items: Client[];
}
