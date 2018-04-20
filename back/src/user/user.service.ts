import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepositoryToken, GroupRepositoryToken } from '../constants';
import { IUser } from '../../../common/interface';
import { CreateUserDto, EditUserDto } from '../../../common/dto';
import { User } from './user.entity';
import { Group } from './group.entity';

@Component()
export class UserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: Repository<User>,
    @Inject(GroupRepositoryToken)
    private readonly groupRepository: Repository<Group>,
  ) { }

  async getAll(userId?: number[]): Promise<IUser[]> {
    let users: User[];
    if (userId) {
      users = await this.userRepository.findByIds(userId);
    } else {
      users = await this.userRepository.find();
    }
    return users.map(user => this.extractPassword(user));
  }

  async get(userId): Promise<IUser> {
    const user = await this.userRepository.findOneById(userId);
    return user ? this.extractPassword(user) : undefined;
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ email });
    return user ? this.extractPassword(user) : undefined;
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const user: User = this.userRepository.create(createUserDto);
    user.group = await this.groupRepository.findOneById('staff');
    return await this.userRepository.save(user);
  }

  async edit(userId: number, editUserDto: EditUserDto): Promise<void> {
    const keys = Object.keys(editUserDto);
    if (keys.length === 0) {
      return;
    }
    if (keys.length > 1 || keys[0] !== 'groupName') {
      await this.userRepository.updateById(userId, editUserDto);
    }
    if (editUserDto.groupName) {
      const user: User = await this.userRepository.findOneById(userId);
      user.group = await this.groupRepository.findOneById(
        editUserDto.groupName,
      );
      await this.userRepository.save(user);
    }
  }

  async delete(user: string | number | IUser): Promise<void> {
    const userId: number =
      typeof user === 'number'
        ? user
        : typeof user === 'string' ? parseInt(user, 10) : user.id;
    return await this.userRepository.deleteById(userId);
  }

  async verifyCredentials(credentials: {
    email: string;
    password: string;
  }): Promise<IUser> {
    const user = await this.userRepository.findOne(credentials);
    return user ? this.extractPassword(user) : undefined;
  }

  private extractPassword(user: User): IUser {
    const { password, ...res } = user;
    return res;
  }
}
