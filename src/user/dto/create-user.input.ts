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
  @Field(() => String, { description: 'Número único del documento del usuario' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @Matches(/^[0-9]+$/, {
    message: 'El número de documento solo puede contener números.',
  })
  documentNumber: string;

  @Field(() => String, { description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 75)
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios.',
  })
  firstName: string;

  @Field(() => String, { description: 'Apellido del usuario' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 75)
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: 'El apellido solo puede contener letras y espacios.',
  })
  lastName: string;

  @Field(() => String, { description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty()
  email: string;

  @Field(() => String, { description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 100)
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.,;:+\-_=#])[A-Za-z\d@$!%*?&.,;:+\-_=#]{8,}$/,
    {
      message:
        'La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial.',
    },
  )
  password: string;

  @Field(() => Gender)
  @IsEnum(Gender)
  gender: Gender;

  @Field(() => Status, { nullable: true })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @Field(() => Role)
  @IsEnum(Role)
  role: Role;

  @Field(() => Int)
  @IsInt()
  documentTypeId: number;

  @Field(() => Int)
  @IsInt()
  municipalityId: number;
}
