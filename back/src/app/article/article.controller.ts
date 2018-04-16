import {
  Get,
  Controller,
  Inject,
  Query,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from '../../shop/article.service';
import { Article } from '../../shop/article.entity';
import { Category } from 'shop/category.entity';
import {
  CreateCategoryDto,
  EditArticleDto,
  CreateArticleDto,
} from './article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/categories')
  getCat(): any {
    return this.articleService.getCategories();
  }

  @Post('/categories')
  @UsePipes(new ValidationPipe())
  postCat(@Body() body: CreateCategoryDto): any {
    return this.articleService.addCategory(body);
  }

  @Put('/categories/:id')
  @UsePipes(new ValidationPipe())
  putCat(@Param() param, @Body() body: CreateCategoryDto): any {
    return this.articleService.updateCategory(param.id, body);
  }

  @Delete('/categories/:id')
  deleteCat(@Param() param): any {
    return this.articleService.deleteCategory(param.id);
  }

  @Get()
  get(@Query() query): any {
    if (query.category) {
      return this.articleService.getAllByCategory(query.category);
    } else {
      return this.articleService.getAll();
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  post(@Body() body: CreateArticleDto): any {
    if (body) {
      return this.articleService.create(body);
    }
  }

  @Get(':id')
  getId(@Param() param): any {
    return this.articleService.getById(param.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  put(@Param() param, @Body() body: EditArticleDto): any {
    return this.articleService.edit(param.id, body);
  }
}
