import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { DatabaseModule } from '~/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ClientResolver, ClientService],
})
export class ClientModule {}
