import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { raw } from 'body-parser';
import { AppModule } from './app/app.module';
import { GroupsGuard } from './groups.guard';
import * as cors from 'cors';

async function bootstrap() {
  const server = express();
  server.use(raw({ limit: '200kb' }));
  const app = await NestFactory.create(AppModule, server, { cors: true });
  const groupsGuard = app.select(AppModule).get(GroupsGuard);
  app.useGlobalGuards(groupsGuard);
  await app.listen(3000);
}
bootstrap();
