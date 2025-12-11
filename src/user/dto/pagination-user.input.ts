import { Field, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '~/common/enums/role.enum';
import { PaginationDto } from '~/common/pagination/dto/pagination.dto';

@InputType()
export class PaginationUserInput extends PartialType(PaginationDto) {
  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;
}
