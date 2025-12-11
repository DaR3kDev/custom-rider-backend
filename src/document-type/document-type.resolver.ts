import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DocumentTypeService } from './document-type.service';
import { DocumentType } from './entities/document-type.entity';

@Resolver(() => DocumentType)
export class DocumentTypeResolver {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Query(() => [DocumentType], { name: 'documentTypes' })
  async getDocumentTypes() {
    return await this.documentTypeService.getAllDocumentTypes();
  }
}
