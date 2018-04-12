import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { GroupDto } from './group.dto';
import { IGroup } from '../../../../common/interface';
import { GroupService } from '../../user/group.service';
import { ValidationPipe } from '../validation.pipe';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAll(): Promise<IGroup[]> {
    return await this.groupService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() groupDto: GroupDto): Promise<IGroup> {
    return await this.groupService.create(groupDto);
  }

  @Get(':id')
  async getById(@Param() params): Promise<IGroup> {
    return await this.groupService.get(params.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async edit(@Param() params, @Body() groupDto: GroupDto): Promise<void> {
    return await this.groupService.edit(params.id, groupDto);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.groupService.delete(params.id);
  }
}
