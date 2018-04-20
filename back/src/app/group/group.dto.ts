import { IsString, IsNotEmpty } from 'class-validator';
import { GroupDto as IGroupDto } from '../../../../common/dto';

export class GroupDto implements IGroupDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
