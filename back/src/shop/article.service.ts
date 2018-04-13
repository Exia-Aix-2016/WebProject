import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import {
  ArticleRepositoryToken,
  CartArticleRepositoryToken,
  CategoryRepositoryToken,
} from '../constants';
import { CartArticle } from './cart-article.entity';
import { EditArticleDto, CreateArticleDto } from '../../../common/dto';
import { IArticle, ICategory } from '../../../common/interface';
import { Category } from './category.entity';
import { error } from 'util';

@Component()
export class ArticleService {
  constructor(
    @Inject(ArticleRepositoryToken)
    private readonly articleRepository: Repository<Article>,
    @Inject(CartArticleRepositoryToken)
    private readonly cartArticleRepository: Repository<CartArticle>,
    @Inject(CategoryRepositoryToken)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async edit(id: number,editArticleDto: EditArticleDto): Promise<void> {
    return await this.articleRepository.updateById(
      id,
      editArticleDto,
    );
  }

  async create(createArticleDto: CreateArticleDto): Promise<IArticle> {
    const category: Category = await this.categoryRepository.findOneById(createArticleDto.categoryName);
    const article: Article = this.articleRepository.create(createArticleDto);    
    if(category){
      article.category = category;
    }
    return await this.articleRepository.save(article);
  }

  async getAll(): Promise<IArticle[]> {
      return await this.articleRepository.find();
  }

  async getAllByCategory(categoryName: string): Promise<IArticle[]> {
    return (await this.articleRepository.find()).filter(a => a.categoryName == categoryName);
  }

  async getById(id: number): Promise<IArticle>{
    return await this.articleRepository.findOneById(id);
  }

  async getCategories(): Promise<ICategory[]>{
    return this.categoryRepository.find();
  }
}
