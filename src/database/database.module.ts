import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { IdGeneratorService } from './id-generator.service';

@Module({
  providers: [DatabaseService, IdGeneratorService],
  exports: [DatabaseService, IdGeneratorService],
})
export class DatabaseModule {}
