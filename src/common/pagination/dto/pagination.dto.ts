import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class PaginationDto {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Type(() => String)
  search?: string;
}
