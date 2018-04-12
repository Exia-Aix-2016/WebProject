import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { articleProviders } from './article.provider';
import { cartArticleProviders } from './cart-article.provider';
import { cartProviders } from './cart.provider';
import { categoryProviders } from './category.provider';

@Module({
  imports: [DatabaseModule],
  components: [
    ...articleProviders,
    ...cartArticleProviders,
    ...cartProviders,
    ...categoryProviders,
  ],
  exports: [ShopModule],
})
export class ShopModule {}
