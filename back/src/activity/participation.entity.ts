import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Participation {
  @PrimaryColumn() userId: number;

  @ManyToOne(type => Activity, activity => activity.participations, {
    primary: true,
    onDelete: 'CASCADE',
  })
  activity: Activity;
}
