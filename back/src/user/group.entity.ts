import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Group {
  @PrimaryColumn({ length: 45 })
  name: string;

  @OneToMany(type => User, user => user.group)
  users: User[];
}
