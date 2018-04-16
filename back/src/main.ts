import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GroupsGuard } from './groups.guard';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  const groupsGuard = app.select(AppModule).get(GroupsGuard);
  app.useGlobalGuards(groupsGuard);
  await app.listen(3000);
}
bootstrap();
