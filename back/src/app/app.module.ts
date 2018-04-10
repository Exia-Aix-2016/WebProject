import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ShopModule } from '../shop/shop.module';
import { ActivityModule } from '../activity/activity.module';
import { SocialModule } from '../social/social.module';
import { AppController } from './app.controller';
import { UserController } from './user.controller';

@Module({
  imports: [UserModule, ActivityModule, ShopModule, SocialModule],
  controllers: [AppController, UserController],
  components: [],
})
export class AppModule {}
