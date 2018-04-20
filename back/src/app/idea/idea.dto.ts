import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import {
  CreateIdeaDto as ICreateIdeaDto,
  BooleanEditIdea as IBooleanEditIdea,
} from '../../../../common/dto';

export class CreateIdeaDto implements ICreateIdeaDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  @IsOptional()
  readonly posterUrl?: string;
}

export class BooleanEditIdea implements IBooleanEditIdea {
  @IsBoolean() readonly value: boolean;
}
