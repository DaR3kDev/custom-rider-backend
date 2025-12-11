import { Module } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { DocumentTypeResolver } from './document-type.resolver';
import { DatabaseModule } from '~/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DocumentTypeResolver, DocumentTypeService],
})
export class DocumentTypeModule {}
