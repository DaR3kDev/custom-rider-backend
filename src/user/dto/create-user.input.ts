import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  Matches,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Gender } from '~/common/enums/gender.enum';
import { Role } from '~/common/enums/role.enum';
import { Status } from '~/common/enums/status.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    description: 'Número único del documento del usuario',
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
    description: 'Nombre del usuario',
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
    description: 'Apellido del usuario',
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
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'Ingrese un correo electrónico válido.' })
  @IsNotEmpty({ message: 'Por favor ingrese el correo electrónico.' })
  email: string;

  @Field(() => String, {
    description: 'Contraseña del usuario',
  })
  @IsString({ message: 'La contraseña es obligatoria.' })
  @IsNotEmpty({ message: 'Por favor ingrese la contraseña.' })
  @Length(8, 100, {
    message: 'La contraseña debe tener al menos 8 caracteres.',
  })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.,;:+\-_=#])[A-Za-z\d@$!%*?&.,;:+\-_=#]{8,}$/,
    {
      message:
        'La contraseña debe incluir una mayúscula, una minúscula, un número y un carácter especial.',
    },
  )
  password: string;

  @Field(() => Gender)
  @IsEnum(Gender, {
    message: 'Seleccione un género válido.',
  })
  gender: Gender;

  @Field(() => Status, { nullable: true })
  @IsEnum(Status, {
    message: 'Seleccione un estado válido.',
  })
  @IsOptional()
  status?: Status;

  @Field(() => Role)
  @IsEnum(Role, {
    message: 'Seleccione un rol válido.',
  })
  role: Role;

  @Field(() => Int)
  @IsInt({ message: 'Seleccione un tipo de documento válido.' })
  @IsNotEmpty({ message: 'Debe seleccionar un tipo de documento.' })
  documentTypeId: number;

  @Field(() => Int)
  @IsInt({ message: 'Seleccione un municipio válido.' })
  @IsNotEmpty({ message: 'Debe seleccionar un municipio.' })
  municipalityId: number;
}
