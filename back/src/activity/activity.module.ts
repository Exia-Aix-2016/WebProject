import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { activityProviders } from './activity.provider';
import { ActivityService } from './activity.service';

@Module({
  imports: [DatabaseModule],
  components: [...activityProviders, ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
