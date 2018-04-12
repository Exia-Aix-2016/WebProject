import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepositoryToken, GroupRepositoryToken } from '../constants';
import { IUser, IGroup } from '../../../common/interface';
import { CreateUserDto, EditUserDto } from '../../../common/dto';
import { Group } from './group.entity';
import { GroupDto } from 'app/group/group.dto';

@Component()
export class GroupService {
  constructor(
    @Inject(GroupRepositoryToken)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async getAll(): Promise<IGroup[]> {
    return await this.groupRepository.find();
  }

  async get(groupName): Promise<IGroup> {
    return await this.groupRepository.findOneById(groupName);
  }

  async create(groupDto: GroupDto): Promise<IGroup> {
    const group: Group = this.groupRepository.create(groupDto);
    return await this.groupRepository.save(group);
  }

  async edit(groupName: string, groupDto: GroupDto): Promise<void> {
    return await this.groupRepository.updateById(groupName, groupDto);
  }

  async delete(group: string | IGroup): Promise<void> {
    const groupName: string = typeof group === 'string' ? group : group.name;
    return await this.groupRepository.deleteById(groupName);
  }
}
