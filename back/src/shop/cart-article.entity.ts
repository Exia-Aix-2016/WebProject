import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';
import { Cart } from './cart.entity';
import { Article } from './article.entity';

@Entity()
export class CartArticle {
  @ManyToOne(type => Cart, cart => cart.cartArticles, {primary: true})
  cart: Cart;

  @ManyToOne(type => Article, article => article.cartArticles, {primary: true})
  article: Article;

  @Column() quantity: number;

  @RelationId((cartArticle: CartArticle) => cartArticle.article)
  articleId: number;

  @RelationId((cartArticle: CartArticle) => cartArticle.cart)
  cartId: number;
}
