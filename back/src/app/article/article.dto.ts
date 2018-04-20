import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import {
    CreateArticleDto as ICreateArticleDto,
    EditArticleDto as IEditArticleDto,
    CreateCategoryDto as ICreateCategoryDto,
  } from '../../../../common/dto'

  export class CreateArticleDto implements ICreateArticleDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsString()
    @IsNotEmpty()
    readonly pictureUrl: string;

    @IsString()
    @IsNotEmpty()
    readonly categoryName: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly selling: boolean;
  }

  export class EditArticleDto implements IEditArticleDto{
    @IsString()
    @IsOptional()
    readonly name?: string; 
    
    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsOptional()
    @IsNumber()
    readonly price?: number;

    @IsOptional()
    @IsString()
    readonly pictureUrl?: string;

    @IsOptional()
    @IsString()
    readonly categoryName?: string;

    @IsBoolean()
    @IsOptional()
    readonly selling?: boolean;

    @IsOptional()
    @IsNumber()
    readonly solded?: number;
  }

  export class CreateCategoryDto implements ICreateCategoryDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  }