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
  FileInterceptor,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import * as crypto from 'crypto'
import * as fs from 'fs';

import * as path from 'path';

@Controller('files')
export class FileController {
  constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() img): string {
    console.log(img.originalname);

    const fileName: string = crypto.createHash('md5').update(img.originalname).digest('hex') + Math.random();
    console.log(fileName);
    fs.createWriteStream(`../imgs/${fileName}.png`);
    fs.writeFile(`../imgs/${fileName}.png`, img.buffer, err => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    return 'url';
  }
}