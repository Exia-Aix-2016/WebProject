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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ActivityService } from '../../activity/activity.service';
import { IIdea, IPayload } from '../../../../common/interface';
import { CreateIdeaDto, BooleanEditIdea } from './idea.dto';
import { User } from '../user.decorator';

@Controller('ideas')
export class IdeaController {
  constructor(private readonly activityService: ActivityService) { }

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
  async delete(@Param('id', new ParseIntPipe()) ideaId: number): Promise<void> {
    return await this.activityService.delete(ideaId);
  }

  @Get(':id/vote')
  async getVote(@User() user: IPayload, @Param('id', new ParseIntPipe()) ideaId: number): Promise<{ value: boolean }> {
    const activity: IIdea = (await this.activityService.getAllIdeas()).find(idea => idea.id === ideaId);
    if (activity == null) {
      throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
    }
    return { value: activity.votes.find(v => v.userId === user.id) ? true : false };
  }

  @Put(':id/vote')
  async vote(
    @Request() request,
    @Param('id', new ParseIntPipe()) ideaId: number,
    @Body() booleanEditIdea: BooleanEditIdea,
  ): Promise<void> {
    return await this.activityService.vote(
      request.user.id,
      ideaId,
      booleanEditIdea.value,
    );
  }

  @Put(':id/signal')
  async signal(
    @Param('id', new ParseIntPipe()) ideaId: number,
    @Body() booleanEditIdea: BooleanEditIdea,
  ): Promise<void> {
    return await this.activityService.signal(
      ideaId,
      booleanEditIdea.value,
    );
  }
}
