import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { CartArticle } from './cart-article.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    validated: boolean;

    @Column()
    delivered: boolean;

    @OneToMany(type => CartArticle, cartArticle => cartArticle.cartId)
    cartArticles: CartArticle[]; 
}