import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { User } from '../user/user.entity';
import { CartRepositoryToken, CartArticleRepositoryToken } from '../constants';
import { CreateCartDto, CartStateDto } from '../../../common/dto';
import { Article } from './article.entity';
import { CartArticle } from './cart-article.entity';
import { ICart, IArticle } from '../../../common/interface';

@Component()
export class CartService {
    constructor(
        @Inject(CartRepositoryToken)
        private readonly cartRepository: Repository<Cart>,

        @Inject(CartArticleRepositoryToken)
        private readonly cartArticleRepository: Repository<CartArticle>,
    ) {}

    async create(createCartDto: CreateCartDto): Promise<ICart>{
        const cart: Cart = this.cartRepository.create(createCartDto);
        return await this.cartRepository.save(cart);
    }

    async setArticleQuantity(cart: ICart|number, article: IArticle, number, quantity: number): Promise<void>{
        const cartId: number = typeof cart === 'number' ? cart : cart.id;
        const articleId: number = typeof article === 'number' ? article : article.id;
        const myArticle: CartArticle = await this.cartArticleRepository.findOne({cartId, articleId});
        return await this.cartArticleRepository.update(myArticle, {quantity});
    }

    async get(id: number): Promise<ICart>{
        return await this.cartRepository.findOneById(id);
    }

    async getByUser(id: number): Promise<Cart[]>{
        return await this.cartRepository.find({id});
    }

    async setState(cartStateDto: CartStateDto): Promise<void>{
        return await this.cartRepository.updateById(cartStateDto.id, cartStateDto);
    }

    async getUndelivered(): Promise<ICart[]>{
        return await this.cartRepository.find({delivered: false})
    }

}