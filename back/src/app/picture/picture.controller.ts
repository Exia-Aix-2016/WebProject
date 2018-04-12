import { Body, Get, Post, Put, Delete, Controller, Inject, Param } from '@nestjs/common';
import { SocialService } from '../../social/social.service';
import { Picture } from '../../social/picture.entity';
import { SocialSelectorDto } from '../../../../common/dto/index';
import { IPicture } from '../../../../common/interface/index';
import { isUndefined } from 'util';

@Controller('pictures')
export class PictureController {
  constructor(private readonly socialService: SocialService) {}

  @Get(':id')
  async findPicturesByActivityId(@Param() params) {

    return await this.socialService.getPictures(params.id);
  }

  @Delete(':id')
  async deletePictureById(@Param() params){

    let picture:IPicture = await this.socialService.getPicture(params.id);
    await this.socialService.delete({picture});
  }

  @Put(':id/like')
  async likedPicture(@Param() params, @Body() bodyParams){
      if(isUndefined(bodyParams.userId) && isUndefined(bodyParams.liked)){
          return {statut: 'error', msg: 'wrong body params'};
      }

      await this.socialService.like(parseInt(params.id, 10), parseInt(bodyParams.userId, 10), (bodyParams.liked == 'true'));
  }
}
