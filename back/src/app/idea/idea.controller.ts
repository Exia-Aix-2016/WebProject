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
import { IIdea } from '../../../../common/interface';
import { CreateIdeaDto, BooleanEditIdea } from './idea.dto';

@Controller('ideas')
export class IdeaController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getAll(): Promise<IIdea[]> {
    return await this.activityService.getAllIdeas();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createIdeaDto: CreateIdeaDto): Promise<IIdea> {
    return this.activityService.createIdea(createIdeaDto);
  }

  @Delete(':id')
  async delete(@Param() params): Promise<void> {
    return await this.activityService.delete(params.id);
  }

  @Put(':id/vote')
  async vote(
    @Request() request,
    @Param() params,
    @Body() booleanEditIdea: BooleanEditIdea,
  ): Promise<void> {
    return await this.activityService.vote(
      request.user.id,
      parseInt(params.id, 10),
      booleanEditIdea.value,
    );
  }

  @Put(':id/signal')
  async signal(
    @Param() params,
    @Body() booleanEditIdea: BooleanEditIdea,
  ): Promise<void> {
    return await this.activityService.signal(
      parseInt(params.id, 10),
      booleanEditIdea.value,
    );
  }
}
