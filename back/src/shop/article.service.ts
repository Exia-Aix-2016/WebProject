import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import {
  ArticleRepositoryToken,
  CartArticleRepositoryToken,
} from '../constants';
import { CartArticle } from './cart-article.entity';
import { EditArticleDto, CreateArticleDto } from '../../../common/dto';
import { IArticle } from '../../../common/interface';

@Component()
export class ArticleService {
  constructor(
    @Inject(ArticleRepositoryToken)
    private readonly articleRepository: Repository<Article>,
    @Inject(CartArticleRepositoryToken)
    private readonly cartArticleRepository: Repository<CartArticle>,
  ) {}

  async edit(editArticleDto: EditArticleDto): Promise<void> {
    return await this.articleRepository.updateById(
      editArticleDto.id,
      editArticleDto,
    );
  }

  async create(createArticleDto: CreateArticleDto): Promise<IArticle> {
    const article: Article = this.articleRepository.create(createArticleDto);
    return await this.articleRepository.save(article);
  }

  async getAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }
}
