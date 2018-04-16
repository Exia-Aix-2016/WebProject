import {
  Controller,
  Get,
  Body,
  Post,
  UsePipes,
  Param,
  Put,
  Delete,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { ActivityService } from '../../activity/activity.service';
import { IIdea, IActivity } from '../../../../common/interface';
import { CreateActivityDtoSSS } from './activity.dto';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getAll(): Promise<IActivity[]> {
    return await this.activityService.getAllActivites();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createActivityDto: CreateActivityDtoSSS,
  ): Promise<IActivity> {
    return await this.activityService.createActivity(createActivityDto);
  }
}
