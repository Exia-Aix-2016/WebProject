import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityRepositoryToken } from '../constants';
import {} from '../../../common/interface';
import {} from '../../../common/dto';
import { Activity } from './activity.entity';

@Component()
export class ActivityService {
  constructor(
    @Inject(ActivityRepositoryToken)
    private readonly activityRepository: Repository<Activity>,
  ) {}
}
