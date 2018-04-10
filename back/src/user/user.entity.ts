import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45 })
  firstname: string;

  @Column({ length: 45 })
  email: string;

  @Column({ length: 45 })
  password: string;

  @ManyToOne(type => Group, group => group.users)
  group: Group;
}
