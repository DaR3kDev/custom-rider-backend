import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '~/database/database.service';
import identification_types from '~/document-type/data/identification_types.json';

@Injectable()
export class DocumentTypeService implements OnModuleInit {
  constructor(private readonly databaseServices: DatabaseService) {}

  async onModuleInit() {
    for (const { abbreviation, name } of identification_types) {
      await this.databaseServices.documentType.upsert({
        where: { abbreviation },
        update: {},
        create: {
          abbreviation,
          name,
        },
      });
    }
  }

  async getAllDocumentTypes() {
    return await this.databaseServices.documentType.findMany();
  }
}
