import {
  Body,
  Get,
  Post,
  Put,
  Delete,
  Controller,
  Inject,
  Param,
  UsePipes,
  Request,
  Res,
  FileInterceptor,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';

import * as path from 'path';

@Controller('files')
export class FileController {
  constructor() { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() img): object {
    const fileName: string = crypto.createHash('sha1').update(img.originalname).digest('hex') + Math.random();
    fs.createWriteStream(`../imgs/${fileName}.png`);
    fs.writeFile(`../imgs/${fileName}.png`, img.buffer, err => {
      if (err) throw err;
    });
    return {
      imgUrl: `http://localhost:3000/files/${fileName}.png`,
    };
  }
  @Get(':name')
  getFile(@Param() params, @Res() response) {
    fs.readFile(`../imgs/${params.name}`, (err, data) => {
      response.set('content-type', 'image/png').send(data);
    });
  }
}