import { Module } from '@nestjs/common';
import { activityProviders } from './activity.provider';
import { occurrenceProviders } from './occurrence.provider';
import { participationProviders } from './participation.provider';
import { ActivityService } from './activity.service';

@Module({
  components: [
    ...activityProviders,
    ...occurrenceProviders,
    ...participationProviders,
    ActivityService,
  ],
  exports: [ActivityService],
})
export class ActivityModule {}
