import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  RelationId,
  ManyToOne,
} from 'typeorm';
import { Occurrence } from './occurrence.entity';
import { Participation } from './participation.entity';
import { Vote } from './vote.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 100 })
  posterUrl: string;

  @Column('datetime') date: Date;

  @Column() price: number;

  @Column() planned: boolean;

  @Column() signaled: boolean;

  @ManyToOne(type => Occurrence, occurrence => occurrence.activities)
  occurrence: Occurrence;

  @RelationId((activity: Activity) => activity.occurrence)
  occurrenceName: string;

  @OneToMany(type => Participation, participation => participation.activity, { eager: true })
  participations: Participation[];

  @OneToMany(type => Vote, vote => vote.activity, { eager: true })
  votes: Vote[];
}
