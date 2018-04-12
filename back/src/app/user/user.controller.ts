import {
  Get,
  Post,
  Put,
  Body,
  Controller,
  Inject,
  UsePipes,
  Param,
  Delete,
} from '@nestjs/common';
import { ValidationPipe } from '../validation.pipe';
import { UserService } from '../../user/user.service';
import { IUser } from '../../../../common/interface';
import { CreateUserDto, EditUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<IUser[]> {
    return await this.userService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  async getById(@Param() params): Promise<IUser> {
    return await this.userService.get(params.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async edit(@Param() params, @Body() editUserDto: EditUserDto): Promise<void> {
    return await this.userService.edit(params.id, editUserDto);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.userService.delete(params.id);
  }
}
