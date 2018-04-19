import {
  IsString,
  IsEmail,
  Equals,
  IsNotEmpty,
  Matches,
  Length,
  IsOptional,
  IsNumber,
  IsEnum,
  IsIn,
} from 'class-validator';
import {
  CreateUserDto as ICreateUserDto,
  EditUserDto as IEditUserDto,
} from '../../../../common/dto';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @IsEmail() readonly email: string;

  @IsString()
  @Length(8, 45)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  @Matches(/[#^~&/!?;%*$€]/)
  readonly password: string;
}

export class EditUserDto implements IEditUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;
  @IsOptional()
  @IsString()
  readonly firstname?: string;
  @IsOptional()
  @IsEmail()
  readonly email?: string;
  @IsOptional()
  @IsString()
  @Length(8, 45)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  @Matches(/[#^~&/!?;%*$€]/)
  readonly password?: string;
  @IsOptional()
  @IsIn(['staff', 'cesi', 'student'])
  readonly groupName?: string;
}