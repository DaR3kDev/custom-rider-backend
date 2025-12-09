import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';
import { DatabaseModule } from '~/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LocationResolver, LocationService],
})
export class LocationModule {}
