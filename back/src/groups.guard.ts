import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';
import { UserService } from './user/user.service';
import { IUser } from '../../common/interface';

@Guard()
export class GroupsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) { }

  async canActivate(req, context: ExecutionContext): Promise<boolean> {
    const { parent, handler } = context;
    const groups = this.reflector.get<string[]>('groups', handler);
    if (!groups) {
      return true;
    }
    const user: IUser = await this.userService.get(req.user.id);
    if (user) {
      return groups.find(group => group === user.groupName) ? true : false;
    }
    return false;
  }
}
