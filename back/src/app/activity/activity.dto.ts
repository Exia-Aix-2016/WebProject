import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsDate,
  IsNumber,
  IsDateString,
  IsBoolean,
} from 'class-validator';

import {
  CreateActivityDto as ICreateActivityDto,
  EditActivityDto as IEditActivityDto,
} from '../../../../common/dto';

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

export class EditActvityDto implements IEditActivityDto {
  @IsNumber() id: number;
  @IsString()
  @IsOptional()
  @MaxLength(45)
  readonly name?: string;
  @IsString()
  @IsOptional()
  @MaxLength(500)
  readonly description?: string;
  @IsString()
  @IsOptional()
  @MaxLength(100)
  readonly posterUrl?: string;
  @IsDateString()
  @IsOptional()
  readonly date?: Date;
  @IsNumber()
  @IsOptional()
  readonly price?: number;
  @IsString()
  @IsOptional()
  readonly occurrenceName?: string;
  @IsBoolean()
  @IsOptional()
  readonly planned?: boolean;
}

export class BooleanEditDto {
  @IsBoolean() readonly value: boolean;
}
