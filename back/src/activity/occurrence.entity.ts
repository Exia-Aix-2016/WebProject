import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Occurrence {
  @PrimaryColumn({ length: 45 })
  name: string;

  @OneToMany(type => Activity, activity => activity.occurrence)
  activities: Activity[];
}
