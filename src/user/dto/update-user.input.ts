import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { Match } from '../../common/decorators/match.decorator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Match('password', { message: 'Las contraseñas no coinciden.' })
  confirmPassword?: string;
}
