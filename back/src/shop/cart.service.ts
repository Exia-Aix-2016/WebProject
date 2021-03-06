import { Component, Inject } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { Cart } from './cart.entity';
import { User } from '../user/user.entity';
import { CartRepositoryToken, CartArticleRepositoryToken, ArticleRepositoryToken } from '../constants';
import { CreateCartDto, CartStateDto, CreateCartArticleDto, SetQuantityInCartDto } from '../../../common/dto';
import { Article } from './article.entity';
import { CartArticle } from './cart-article.entity';
import { ICart, IArticle, ICartArticle } from '../../../common/interface';

@Component()
export class CartService {
  constructor(
    @Inject(CartRepositoryToken)
    private readonly cartRepository: Repository<Cart>,
    @Inject(CartArticleRepositoryToken)
    private readonly cartArticleRepository: Repository<CartArticle>,
    @Inject(ArticleRepositoryToken)
    private readonly articleRepository: Repository<Article>,
  ) { }

  async create(createCartDto: CreateCartDto): Promise<ICart> {
    const cart: Cart = this.cartRepository.create(createCartDto);
    return await this.cartRepository.save(cart);
  }

  async setArticleQuantity(
    cart: ICart | number,
    article: IArticle,
    number,
    quantity: number,
  ): Promise<void> {
    const cartId: number = typeof cart === 'number' ? cart : cart.id;
    const articleId: number =
      typeof article === 'number' ? article : article.id;
    const myArticle: CartArticle = await this.cartArticleRepository.findOne({
      cartId,
      articleId,
    });
    return await this.cartArticleRepository.update(myArticle, { quantity });
  }

  async getAll(): Promise<ICart[]> {
    return await this.cartRepository.find();
  }

  async getById(id: number): Promise<ICart> {
    return await this.cartRepository.findOneById(id);
  }

  async getByUser(userId: number): Promise<Cart[]> {
    return await this.cartRepository.find({ userId });
  }

  async setState(id: number, cartStateDto: CartStateDto): Promise<void> {
    return await this.cartRepository.updateById(id, cartStateDto);
  }

  async getUndelivered(): Promise<ICart[]> {
    return await this.cartRepository.find({ delivered: false });
  }

  async delete(id: number): Promise<void> {
    return await this.cartRepository.deleteById(id);
  }

  async getArticlesById(cartId: number): Promise<ICartArticle[]> {
    return await this.cartArticleRepository
      .createQueryBuilder('cartArticle')
      .where('cartArticle.cartId=:cartId', { cartId })
      .getMany();
  }

  async addArticle(idCart: number, createCartArticleDto: CreateCartArticleDto): Promise<ICartArticle> {
    const cartArticle: CartArticle = await this.cartArticleRepository.create(createCartArticleDto);
    cartArticle.cart = await this.cartRepository.findOneById(idCart);
    cartArticle.article = await this.articleRepository.findOneById(createCartArticleDto.articleId);
    return await this.cartArticleRepository.save(cartArticle);
  }

  async setQuantityInCart(cartId: number, articleId: number, setQuantityInCart: SetQuantityInCartDto): Promise<void> {
    return await getConnection()
      .createQueryBuilder()
      .update(CartArticle)
      .set(setQuantityInCart)
      .where('cartId=:cartId AND articleId=:articleId', { cartId, articleId })
      .execute();
  }

  async deleteArticleInCart(cartId: number, articleId: number): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CartArticle)
      .where('cartId=:cartId AND articleId=:articleId', { cartId, articleId })
      .execute();
  }
}
