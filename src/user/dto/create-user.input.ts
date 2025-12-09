import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';
import { Gender } from '~/common/enums/gender.enum';
import { Role } from '~/common/enums/role.enum';
import { Status } from '~/common/enums/status.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Número único del documento del usuario' })
  @IsString({ message: 'El número de documento debe ser un texto.' })
  @IsNotEmpty({ message: 'El número de documento es obligatorio.' })
  @Length(5, 20, {
    message: 'El número de documento debe tener entre 5 y 20 caracteres.',
  })
  @Matches(/^[0-9]+$/, {
    message: 'El número de documento solo puede contener números.',
  })
  documentNumber: string;

  @Field(() => String, { description: 'Nombre del usuario' })
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @Length(2, 75, {
    message: 'El nombre debe tener entre 2 y 75 caracteres.',
  })
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios.',
  })
  firstName: string;

  @Field(() => String, { description: 'Apellido del usuario' })
  @IsString({ message: 'El apellido debe ser un texto.' })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @Length(2, 75, {
    message: 'El apellido debe tener entre 2 y 75 caracteres.',
  })
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: 'El apellido solo puede contener letras y espacios.',
  })
  lastName: string;

  @Field(() => String, { description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  email: string;

  @Field(() => String, { description: 'Contraseña del usuario' })
  @IsString({ message: 'La contraseña debe ser un texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @Length(8, 100, {
    message: 'La contraseña debe tener mínimo 8 caracteres.',
  })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.,;:+\-_=#])[A-Za-z\d@$!%*?&.,;:+\-_=#]{8,}$/,
    {
      message:
        'La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial.',
    },
  )
  password: string;

  @Field(() => Gender, { description: 'Género del usuario' })
  @IsEnum(Gender, { message: 'El género seleccionado no es válido.' })
  gender: Gender;

  @Field(() => Status, { description: 'Estado del usuario' })
  @IsEnum(Status, { message: 'El estado seleccionado no es válido.' })
  status: Status;

  @Field(() => Role, { description: 'Rol del usuario' })
  @IsEnum(Role, { message: 'El rol seleccionado no es válido.' })
  role: Role;
}
