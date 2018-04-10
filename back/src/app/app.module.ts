import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from '../user/user.module';
import { ShopModule } from '../shop/shop.module';
import { ActivityModule } from '../activity/activity.module';
import { SocialModule } from '../social/social.module';

@Module({
  imports: [ UserModule, ActivityModule, ShopModule, SocialModule ],
  controllers: [ AppController ],
  components: [],
})
export class AppModule {}
