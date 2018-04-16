import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsDate,
  IsNumber,
  IsDateString,
} from 'class-validator';

import { CreateActivityDto as ICreateActivityDto } from '../../../../common/dto';

export class CreateActivityDto implements ICreateActivityDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  readonly description: string;
  @IsString()
  @IsOptional()
  @MaxLength(100)
  readonly posterUrl?: string;
  @IsDateString() readonly date: Date;
  @IsNumber() readonly price: number;
  @IsString()
  @IsNotEmpty()
  readonly occurrenceName: string;
}
