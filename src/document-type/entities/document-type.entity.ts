import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Client } from '~/client/entities/client.entity';
import { User } from '~/user/entity/user.entity';

@ObjectType()
export class DocumentType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  abbreviation: string;

  @Field(() => [User], { nullable: true })
  users?: User[];

  @Field(() => [Client], { nullable: true })
  client?: Client[];
}
