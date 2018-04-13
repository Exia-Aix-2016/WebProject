import { Get, Controller, Inject, Query, Post, Body, Param, Put } from '@nestjs/common';
import { ArticleService } from '../../shop/article.service';
import { Article } from '../../shop/article.entity';
import { Category } from 'shop/category.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  get(@Query() query): any {
    if(query.category){
      return this.articleService.getAllByCategory(query.category);
    }else{
      return this.articleService.getAll();
    }
  }

  @Post()
  post(@Body() body): any{
    if(body){
      return this.articleService.create(body);
    }
  }

  @Get(':id')
  getId(@Param() param): any{
    return this.articleService.getById(param.id);
  }

  @Put(':id')
  put(@Param() param, @Body() body): any{
    return this.articleService.edit(param.id, body);
  }

  @Get('/categories')
  getCat(): any{
    return this.articleService.getCategories();
  }

   
}