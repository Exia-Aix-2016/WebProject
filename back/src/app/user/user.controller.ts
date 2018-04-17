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
  HttpStatus,
  HttpException,
  ValidationPipe,
  Request,
} from '@nestjs/common';
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
    const user: IUser = await this.userService.getByEmail(createUserDto.email);
    if (user) {
      throw new HttpException('Email already used', HttpStatus.CONFLICT);
    }
    return await this.userService.create(createUserDto);
  }

  @Post('me')
  async me(@Request() request): Promise<IUser>{
    console.log(request.body.user);
    return await this.userService.verifyCredentials(request.body.user);
  }

  @Get(':id')
  async getById(@Param() params): Promise<IUser> {
    const user: IUser = await this.userService.get(params.id);
    if (user === undefined) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
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
