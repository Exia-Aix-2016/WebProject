import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Category } from './category.entity';
import { CartArticle } from './cart-article.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 250 })
  description: string;

  @Column() price: number;

  @Column({ length: 100 })
  picture_url: string;

  @ManyToOne(type => Category, category => category.articles)
  category: Category;

  @RelationId((article: Article) => article.category)
  categoryName: string;

  @OneToMany(type => CartArticle, cartArticle => cartArticle.article)
  cartArticles: CartArticle[];
}
