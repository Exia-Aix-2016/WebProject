import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Get,
  Body,
  Request,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LoginDto } from './auth.dto';
import { Groups } from '../groups.decorator';
import { GroupsGuard } from 'groups.guard';

@Controller('auth')
@UseGuards(GroupsGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  public async getToken(@Body() loginDto: LoginDto) {
    return await this.authService.createToken(
      loginDto.email,
      loginDto.password,
    );
  }

  @Get('authorized')
  @Groups('staff')
  public async authorized(@Request() request) {
    return 'Authorized route. Welcome ' + request.user.firstname;
  }
}
