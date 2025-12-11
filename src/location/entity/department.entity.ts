import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Municipality } from '~/location/entity/municipality.entity';

@ObjectType()
export class Department {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Municipality], { nullable: true })
  municipalities?: Municipality[];
}
