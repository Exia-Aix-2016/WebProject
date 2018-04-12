import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Picture } from './picture.entity';
import { PictureRepositoryToken } from '../constants';


@Component()
export class PictureService{
    constructor(
        @Inject(PictureRepositoryToken)
        private readonly pictureRepository: Repository<Picture>,
    ){}

    async findAll(): Promise<Picture[]>{
        return await this.pictureRepository.find();
    }
}


