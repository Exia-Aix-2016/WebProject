import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { articleProviders } from './article.provider';
import { cartArticleProviders } from './cart-article.provider';
import { cartProviders } from './cart.provider';
import { categoryProviders } from './category.provider';
import { ArticleService } from './article.service';
import { CartService } from './cart.service';

@Module({
  imports: [DatabaseModule],
  components: [
    ...articleProviders,
    ...cartArticleProviders,
    ...cartProviders,
    ...categoryProviders,
    CartService,
    ArticleService
  ],
  exports: [ArticleService, CartService],
})
export class ShopModule {}
