import { Get, Controller, Inject } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { UserRepositoryToken } from '../constants';
// import { User } from "../database/user/user.entity";

@Controller()
export class AppController {

  // constructor(
  //   @Inject(UserRepositoryToken) private readonly userRepository: Repository<User>) {}

  @Get()
  root(): string {
    return 'Hello World!';
  }

  // @Get()
  // async test(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }
}
