import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Article } from './article.entity';

@Entity()
export class CartArticle{
    @ManyToOne(type => Cart, cart => cart.cartArticles)
    cartId: Cart; 

    @ManyToOne(type => Article, article => article.cartArticles)
    articleId: Article;

    @Column()
    quantity: number;
}