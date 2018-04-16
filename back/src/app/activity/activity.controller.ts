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
  ParseIntPipe,
} from '@nestjs/common';
import { ActivityService } from '../../activity/activity.service';
import { IIdea, IActivity, IPicture } from '../../../../common/interface';
import { CreateActivityDto } from './activity.dto';
import { SocialService } from 'social/social.service';

@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly socialService: SocialService,
  ) {}

  @Get()
  async getAll(): Promise<IActivity[]> {
    return await this.activityService.getAllActivites();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<IActivity> {
    return await this.activityService.createActivity(createActivityDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe())
    activityId: number,
  ): Promise<void> {
    return await this.activityService.delete(activityId);
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseIntPipe())
    activityId: number,
  ): Promise<IActivity> {
    return await this.activityService.getActivity(activityId);
  }

  @Get(':id/pictures')
  async getPictures(
    @Param('id', new ParseIntPipe())
    activityId: number,
  ): Promise<IPicture[]> {
    await this.activityService.getActivity(activityId);
    return await this.socialService.getPictures(activityId);
  }
}
