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
import * as crypto from 'crypto'
import * as fs from 'fs';

import * as path from 'path';

@Controller('files')
export class FileController {
  constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() img): object {
    console.log(img.originalname);

    const fileName: string = crypto.createHash('md5').update(img.originalname).digest('hex') + Math.random();
    console.log(fileName);
    fs.createWriteStream(`../imgs/${fileName}.png`);
    fs.writeFile(`../imgs/${fileName}.png`, img.buffer, err => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    return {
     "error": "success",
      "imgUrl": `http://localhost:3000/files/${fileName}`

            }
  }
  @Get(':name')
  getFile(@Param() params, @Res() response){
    fs.readFile(`../imgs/${params.name}`, (err, data) => {
      response.set('content-type', 'image/png').send(data);
    });
  }
}