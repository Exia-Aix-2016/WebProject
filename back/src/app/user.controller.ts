import { Get, Controller, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  root(): any {
    return this.userService.findAll();
  }
}
