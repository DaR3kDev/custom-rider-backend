import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '~/common/enums/status.enum';
import { Department } from './department.entity';

@ObjectType()
export class Municipality {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Department)
  department: Department;
}
