import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Get,
  Body,
  Request,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LoginDto } from './auth.dto';
import { ValidationPipe } from '../validation.pipe';

@Controller('auth')
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
  public async authorized(@Request() request) {
    return 'Authorized route. Welcome ' + request.user.firstname;
  }
}
