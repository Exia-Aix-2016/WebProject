import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { groupProviders } from './group.provider';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  components: [...userProviders, ...groupProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
