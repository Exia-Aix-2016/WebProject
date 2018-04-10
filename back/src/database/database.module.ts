import { Module } from '@nestjs/common';
import { databaseProviders } from "./database.providers";
import { userProviders } from './user/user.provider';

@Module({
  components: [ ...databaseProviders, ...userProviders ],
  exports:  [ ...userProviders ]
})
export class DatabaseModule {}
