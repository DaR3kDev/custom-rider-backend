import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int, { description: 'ID del usuario a actualizar' })
  @IsInt({ message: 'El ID debe ser un número entero.' })
  @IsPositive({ message: 'El ID debe ser un número entero positivo.' })
  id: number;
}
