import { Module } from '@nestjs/common';
import { DatabaseService } from '~/database/database.service';
import { IdGeneratorService } from '~/database/id-generator.service';

@Module({
  providers: [DatabaseService, IdGeneratorService],
  exports: [DatabaseService, IdGeneratorService],
})
export class DatabaseModule {}
