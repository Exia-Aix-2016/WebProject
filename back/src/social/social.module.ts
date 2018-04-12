import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { pictureProviders, likeProviders, commentProviders } from './picture.provider';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [DatabaseModule],
  components: [...pictureProviders, ...commentProviders, ...likeProviders, SocialService],
  exports: [ SocialService ],
})
export class SocialModule {}
