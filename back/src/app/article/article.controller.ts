import { Get, Controller, Inject, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ArticleService } from '../../shop/article.service';
import { Article } from '../../shop/article.entity';
import { Category } from 'shop/category.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/categories')
  getCat(): any{
    return this.articleService.getCategories();
  }

  @Post('/categories')
  postCat(@Body() body): any{
    return this.articleService.addCategory(body);
  }

  @Put('/categories/:id')
  putCat(@Param() param, @Body() body): any{
    return this.articleService.updateCategory(param.id, body);
  }
  
  @Delete('/categories/:id')
  deleteCat(@Param() param): any{
    return this.articleService.deleteCategory(param.id);
  }

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

  

   
}