import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '~/common/enums/role.enum';
import { PaginationDto } from '~/common/pagination/dto/pagination.dto';

@InputType()
export class PaginationUserInput extends PaginationDto {
  @Field(() => Role, { nullable: true })
  @IsOptional()
  @IsEnum(Role, { message: 'El rol debe ser un valor válido.' })
  role?: Role;
}
