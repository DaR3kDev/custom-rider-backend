import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length, Matches, IsInt } from 'class-validator';

@InputType()
export class CreateClientInput {
  @Field(() => String, {
    description: 'Número único del documento del cliente',
  })
  @IsString({ message: 'El número de documento es obligatorio.' })
  @IsNotEmpty({ message: 'Por favor ingrese el número de documento.' })
  @Length(5, 20, {
    message: 'El número de documento debe tener entre 5 y 20 dígitos.',
  })
  @Matches(/^[0-9]+$/, {
    message: 'El número de documento solo debe contener números.',
  })
  documentNumber: string;

  @Field(() => String, {
    description: 'Nombre del cliente',
  })
  @IsString({ message: 'El nombre es obligatorio.' })
  @IsNotEmpty({ message: 'Por favor ingrese el nombre.' })
  @Length(2, 75, {
    message: 'El nombre debe tener entre 2 y 75 caracteres.',
  })
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios.',
  })
  firstName: string;

  @Field(() => String, {
    description: 'Apellido del cliente',
  })
  @IsString({ message: 'El apellido es obligatorio.' })
  @IsNotEmpty({ message: 'Por favor ingrese el apellido.' })
  @Length(2, 75, {
    message: 'El apellido debe tener entre 2 y 75 caracteres.',
  })
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: 'El apellido solo puede contener letras y espacios.',
  })
  lastName: string;

  @Field(() => String, {
    description: 'Número de teléfono del cliente',
  })
  @IsString({ message: 'El número de teléfono es obligatorio.' })
  @IsNotEmpty({ message: 'Por favor ingrese el número de teléfono.' })
  @Length(7, 45, {
    message: 'El número de teléfono debe tener entre 7 y 45 caracteres.',
  })
  @Matches(/^[0-9+\s()-]+$/, {
    message: 'El número de teléfono solo puede contener números y los caracteres + ( ) -.',
  })
  phone: string;

  @Field(() => String, {
    description: 'Correo electrónico del cliente',
  })
  @IsEmail({}, { message: 'Ingrese un correo electrónico válido.' })
  @IsNotEmpty({ message: 'Por favor ingrese el correo electrónico.' })
  @Length(5, 100, {
    message: 'El correo electrónico no debe superar los 100 caracteres.',
  })
  email: string;

  @Field(() => Int, {
    description: 'Tipo de documento asociado al cliente',
  })
  @IsInt({ message: 'Seleccione un tipo de documento válido.' })
  @IsNotEmpty({ message: 'Debe seleccionar un tipo de documento.' })
  documentTypeId: number;
}
