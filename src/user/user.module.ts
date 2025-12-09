import { Module } from '@nestjs/common';
import { UserService } from '~/user/user.service';
import { UserResolver } from '~/user/user.resolver';
import { DatabaseModule } from '~/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
