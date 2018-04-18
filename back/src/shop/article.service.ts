import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import {
  ArticleRepositoryToken,
  CartArticleRepositoryToken,
  CategoryRepositoryToken,
} from '../constants';
import { CartArticle } from './cart-article.entity';
import { EditArticleDto, CreateArticleDto, CreateCategoryDto } from '../../../common/dto';
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
  ) { }

  async edit(id: number, editArticleDto: EditArticleDto): Promise<void> {
    return await this.articleRepository.updateById(
      id,
      editArticleDto,
    );
  }

  async create(createArticleDto: CreateArticleDto): Promise<IArticle> {
    const category: Category = await this.categoryRepository.findOneById(createArticleDto.categoryName);
    const article: Article = this.articleRepository.create(createArticleDto);
    if (category) {
      article.category = category;
    }
    return await this.articleRepository.save(article);
  }

  async getAll(withCartArticle = false): Promise<IArticle[]> {
    const articles: Article[] = withCartArticle ?
      await this.articleRepository.find({ relations: ['cartArticles'] })
      : await this.articleRepository.find();
    return articles;
  }

  async getAllByCategory(categoryName: string): Promise<IArticle[]> {
    return (await this.articleRepository.find()).filter(a => a.categoryName === categoryName);
  }

  async getById(id: number): Promise<IArticle> {
    return await this.articleRepository.findOneById(id);
  }

  async getCategories(): Promise<ICategory[]> {
    return await this.categoryRepository.find();
  }

  async addCategory(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const category: Category = await this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async updateCategory(id: string, newId: CreateCategoryDto): Promise<void> {
    return await this.categoryRepository.updateById(id, newId);
  }

  async deleteCategory(id: string): Promise<void> {
    return this.categoryRepository.deleteById(id);
  }
}
