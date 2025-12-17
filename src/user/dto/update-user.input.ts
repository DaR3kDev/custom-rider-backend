import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { CreateUserInput } from '~/user/dto/create-user.input';
import { Match } from '~/common/decorators/match.decorator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'La confirmación de contraseña debe ser texto.' })
  @IsNotEmpty({ message: 'Por favor confirme la contraseña.' })
  @Match('password', {
    message: 'La contraseña y su confirmación no coinciden.',
  })
  confirmPassword?: string;
}
