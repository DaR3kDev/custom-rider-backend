import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gender } from '~/common/enums/gender.enum';
import { Role } from '~/common/enums/role.enum';
import { Status } from '~/common/enums/status.enum';
import { Municipality } from '~/location/entity/municipality.entity';
import { DocumentType } from '~/document-type/entities/document-type.entity';

@ObjectType({ description: 'Usuario del sistema' })
export class User {
  @Field(() => Int, { description: 'ID único del usuario' })
  id: number;

  @Field({ description: 'Número de documento' })
  documentNumber: string;

  @Field({ description: 'Primer nombre del usuario' })
  firstName: string;

  @Field({ description: 'Apellido del usuario' })
  lastName: string;

  @Field({ description: 'Correo electrónico del usuario' })
  email: string;

  @Field(() => Gender, { description: 'Género del usuario' })
  gender: Gender;

  @Field(() => Status, { description: 'Estado del usuario' })
  status: Status;

  @Field(() => Role, { description: 'Rol del usuario' })
  role: Role;

  @Field(() => Municipality, { nullable: true, description: 'Municipio asociado' })
  municipality?: Municipality;

  @Field(() => DocumentType, { nullable: true, description: 'Tipo de documento asociado' })
  documentType?: DocumentType;
}
