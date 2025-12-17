import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DocumentType } from '~/document-type/entities/document-type.entity';

@ObjectType()
export class Client {
  @Field(() => Int)
  id: string;

  @Field()
  documentNumber: string;

  @Field()
  fullName: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => DocumentType)
  documentType: DocumentType;
}
