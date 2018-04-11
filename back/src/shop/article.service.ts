import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleRepositoryToken } from '../constants';
import { CartArticle } from './cart-article.entity';
import { CartArticleRepositoryToken } from '../constants';

@Component()
export class ArticleService {
  constructor(
    @Inject(ArticleRepositoryToken)
    private readonly articleRepository: Repository<Article>,

    @Inject(CartArticleRepositoryToken)
    private readonly cartArticleRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async findById(articleId: number): Promise<Article>{
    return await this.articleRepository.findOneById({articleId});
  }

  async deleteById(articleId: number): Promise<void>{
    await this.cartArticleRepository.deleteById({articleId});
    return await this.articleRepository.deleteById({articleId}); 
  }
}
