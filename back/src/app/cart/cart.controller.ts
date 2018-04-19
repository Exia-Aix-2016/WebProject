import {
  Get,
  Controller,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from '../../shop/cart.service';
import { Cart } from 'shop/cart.entity';
import {
  SetQuantityInCartDto,
  CreateCartArticleDto,
  CreateCartDto,
  CartStateDto,
} from './cart.dto';
import { IPayload, ICart } from '../../../../common/interface';
import { User } from '../user.decorator';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Put(':cartId/articles/:articleId')
  @UsePipes(new ValidationPipe())
  putArticleInCart(@Param() param, @Body() body: SetQuantityInCartDto): any {
    return this.cartService.setQuantityInCart(
      param.cartId,
      param.articleId,
      body,
    );
  }

  @Delete(':cartId/articles/:articleId')
  deleteArticleInCart(@Param() param): any {
    return this.cartService.deleteArticleInCart(param.cartId, param.articleId);
  }

  @Get(':id/articles')
  getArticles(@Param() param): any {
    return this.cartService.getArticlesById(param.id);
  }

  @Post(':id/articles')
  @UsePipes(new ValidationPipe())
  postArticles(@Param() param, @Body() body: CreateCartArticleDto): any {
    return this.cartService.addArticle(param.id, body);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  post(@Body() body: CreateCartDto): any {
    if (body) {
      return this.cartService.create(body);
    }
  }

  @Get('all')
  async getAll(): Promise<ICart[]> {
    return await this.cartService.getAll();
  }

  @Get()
  async getByUser(@User() user: IPayload): Promise<ICart[]> {
    return await this.cartService.getByUser(user.id);
  }

  @Get(':id')
  getId(@Param() param): any {
    return this.cartService.getById(param.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  put(@Param() param, @Body() body: CartStateDto): any {
    return this.cartService.setState(param.id, body);
  }

  @Delete(':id')
  delete(@Param() param): any {
    return this.cartService.delete(param.id);
  }
}
