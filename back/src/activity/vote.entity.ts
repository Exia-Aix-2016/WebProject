import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Vote {
  @PrimaryColumn() userId: number;

  @ManyToOne(type => Activity, activity => activity.votes, {
    primary: true,
    onDelete: 'CASCADE',
  })
  activity: Activity;
}
