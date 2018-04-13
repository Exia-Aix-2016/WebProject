import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ShopModule } from '../shop/shop.module';
import { ActivityModule } from '../activity/activity.module';
import { SocialModule } from '../social/social.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { GroupController } from './group/group.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user.controller';
import { PictureController } from './picture/picture.controller';

@Module({
  imports: [UserModule, ActivityModule, ShopModule, SocialModule, AuthModule],
  controllers: [AppController, UserController, GroupController, AuthController],
  controllers: [AppController, UserController, PictureController],
  components: [],
})
export class AppModule {}
