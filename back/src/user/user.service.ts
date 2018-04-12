import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepositoryToken } from '../constants';
import { IUser } from '../../../common/interface';
import { CreateUserDto, EditUserDto } from '../../../common/dto';
import { User } from './user.entity';

@Component()
export class UserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(userId?: number[]): Promise<IUser[]> {
    if (userId) {
      return await this.userRepository.findByIds(userId);
    } else {
      return await this.userRepository.find();
    }
  }

  async get(userId): Promise<IUser> {
    return await this.userRepository.findOneById(userId);
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const user: User = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async edit(editUserDto: EditUserDto): Promise<void> {
    return await this.userRepository.updateById(editUserDto.id, editUserDto);
  }

  async delete(user: number | IUser): Promise<void> {
    const userId: number = typeof user === 'number' ? user : user.id;
    return await this.userRepository.deleteById(userId);
  }
}
