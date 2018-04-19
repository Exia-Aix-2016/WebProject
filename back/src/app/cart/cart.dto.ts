import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';
import {
  SetQuantityInCartDto as ISetQuantityInCartDto,
  CreateCartArticleDto as ICreateCartArticleDto,
  CreateCartDto as ICreateCartDto,
  CartStateDto as ICartStateDto,
} from '../../../../common/dto';
import { isNumber } from 'util';

export class SetQuantityInCartDto implements ISetQuantityInCartDto {
  @IsNumber()
  @Min(1)
  readonly quantity: number;
}

export class CreateCartArticleDto implements ICreateCartArticleDto {
  @IsOptional()
  @IsNumber()
  readonly cartId?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly articleId: number;

  @IsOptional()
  @IsNumber()
  readonly quantity?: number;
}

export class CreateCartDto implements ICreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}

export class CartStateDto implements ICartStateDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly validated?: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly delivered?: boolean;

}