import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { activityProviders } from './activity.provider';
import { occurrenceProviders } from './occurrence.provider';
import { participationProviders } from './participation.provider';
import { ActivityService } from './activity.service';

@Module({
  imports: [DatabaseModule],
  components: [
    ...activityProviders,
    ...occurrenceProviders,
    ...participationProviders,
    ActivityService,
  ],
  exports: [ActivityService],
})
export class ActivityModule {}
