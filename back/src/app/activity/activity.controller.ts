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
import { IIdea, IActivity, IPicture, IPayload } from '../../../../common/interface';
import {
  CreateActivityDto,
  EditActvityDto,
  BooleanEditDto,
} from './activity.dto';
import { SocialService } from 'social/social.service';
import { User } from '../user.decorator';
import { Occurrence } from 'activity/occurrence.entity';

@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly socialService: SocialService,
  ) { }

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

  @Get('occurrences')
  async getOccurrences(): Promise<string[]> {
    const occurrences: Occurrence[] = await this.activityService.getOccurrences();
    return occurrences.map(occurrence => occurrence.name);
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

  @Put(':id')
  async edit(
    @Param('id', new ParseIntPipe())
    activityId: number,
    @Body(new ValidationPipe())
    editActvityDto: EditActvityDto,
  ): Promise<void> {
    return this.activityService.edit(editActvityDto);
  }

  @Get(':id/pictures')
  async getPictures(
    @Param('id', new ParseIntPipe())
    activityId: number,
  ): Promise<IPicture[]> {
    await this.activityService.getActivity(activityId);
    return await this.socialService.getPictures(activityId);
  }

  @Put(':id/participate')
  async editParticipation(
    @Param('id', new ParseIntPipe())
    activityId: number,
    @Body(new ValidationPipe())
    booleanEditDto: BooleanEditDto,
    @User() user: IPayload,
  ): Promise<void> {
    await this.activityService.participate(
      user.id,
      activityId,
      booleanEditDto.value,
    );
  }

  @Get(':id/participate')
  async getParticipation(@Param('id', new ParseIntPipe()) activityId: number, @Request() request): Promise<{ value: boolean }> {
    const userIds = await this.activityService.getUsers(activityId);
    return { value: userIds.find(userId => userId === request.user.id) ? true : false };
  }

  @Put(':id/signal')
  async editSignal(
    @Param('id', new ParseIntPipe())
    activityId: number,
    @Request() request,
    @Body(new ValidationPipe())
    booleanEditDto: BooleanEditDto,
  ): Promise<void> {
    await this.activityService.signal(activityId, booleanEditDto.value);
  }
}
