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
  ParseIntPipe
} from '@nestjs/common';
import { ActivityService } from '../../activity/activity.service';
import { IIdea } from '../../../../common/interface';
import { CreateIdeaDto, BooleanEditIdea } from './idea.dto';
import { ValidationPipe } from '../validation.pipe';

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
  async delete(@Param('id', new ParseIntPipe()) ideaId: number): Promise<void> {
    return await this.activityService.delete(ideaId);
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
