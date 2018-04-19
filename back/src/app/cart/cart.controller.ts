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
  ParseIntPipe,
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
  putArticleInCart(
    @Param('cartId', new ParseIntPipe()) cartId: number,
    @Param('articleId', new ParseIntPipe()) articleId: number,
    @Body() body: SetQuantityInCartDto): any {
    return this.cartService.setQuantityInCart(
      cartId,
      articleId,
      body,
    );
  }

  @Delete(':cartId/articles/:articleId')
  deleteArticleInCart(
    @Param('cartId', new ParseIntPipe()) cartId: number,
    @Param('articleId', new ParseIntPipe()) articleId: number,
  ): any {
    return this.cartService.deleteArticleInCart(cartId, articleId);
  }

  @Get(':id/articles')
  getArticles(@Param('id', new ParseIntPipe()) cartId: number): any {
    return this.cartService.getArticlesById(cartId);
  }

  @Post(':id/articles')
  @UsePipes(new ValidationPipe())
  postArticles(@Param('id', new ParseIntPipe()) cartId: number, @Body() body: CreateCartArticleDto): any {
    return this.cartService.addArticle(cartId, body);
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
  getId(@Param('id', new ParseIntPipe()) cartId: number): any {
    return this.cartService.getById(cartId);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  put(@Param('id', new ParseIntPipe()) cartId: number, @Body() body: CartStateDto): any {
    return this.cartService.setState(cartId, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) cartId: number): any {
    return this.cartService.delete(cartId);
  }
}
