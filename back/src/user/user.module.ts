import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { groupProviders } from './group.provider';
import { UserService } from './user.service';
import { GroupService } from './group.service';

@Module({
  imports: [DatabaseModule],
  components: [...userProviders, ...groupProviders, UserService, GroupService],
  exports: [UserService, GroupService],
})
export class UserModule {}
