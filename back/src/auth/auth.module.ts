import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import * as passport from 'passport';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [DatabaseModule, UserModule],
  components: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/auth/authorized', method: RequestMethod.ALL },
        { path: '/ideas/*', method: RequestMethod.ALL },
        { path: '/ideas', method: RequestMethod.ALL },
        { path: '/activities/*', method: RequestMethod.ALL },
        { path: '/files', method: RequestMethod.ALL },
        { path: '/articles/categories', method: RequestMethod.ALL },
        { path: '/articles/categories/*', method: RequestMethod.ALL },
        { path: '/pictures', method: RequestMethod.ALL },
        { path: '/pictures/*', method: RequestMethod.ALL },
      );
  }
}
