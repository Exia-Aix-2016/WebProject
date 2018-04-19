import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Category {
  @PrimaryColumn({ length: 45 })
  name: string;

  @OneToMany(type => Article, article => article.category, { cascadeUpdate: true })
  articles: Article[];
}
