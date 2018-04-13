import * as jwt from 'jsonwebtoken';
import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUser } from '../../../common/interface';

@Component()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async createToken(email: string, password: string) {
    const user: IUser = await this.userService.verifyCredentials({
      email,
      password,
    });
    if (user === undefined) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const expiresIn = 60,
      secretOrKey = 'secret';
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    const user: IUser = await this.userService.get(signedUser.id);
    return user ? true : false;
  }
}
