import { Get, Controller, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { CartService } from '../../shop/cart.service';
import { Cart } from 'shop/cart.entity';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

    @Get(':id/articles')
    getArticles(@Param() param): any{
        return this.cartService.getArticlesById(param.id);
    }

    @Post(':id/articles')
    postArticles(@Param() param, @Body() body): any{
        return this.cartService.addArticle(param.id, body);
    }

    @Post()
    post(@Body() body): any{
        if(body){
            return this.cartService.create(body);
        }
    }

    @Get()
    get(): any {
        return this.cartService.getAll();    
    }

    @Get(':id')
    getId(@Param() param): any{
        return this.cartService.getById(param.id);
    }

    @Put(':id')
    put(@Param() param, @Body() body): any{
        return this.cartService.setState(param.id, body);
    }

    @Delete(':id')
    delete(@Param() param): any{
        return this.cartService.delete(param.id);
    }


}
