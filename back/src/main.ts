import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GroupsGuard } from './groups.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const groupsGuard = app.select(AppModule).get(GroupsGuard);
  app.useGlobalGuards(groupsGuard);
  await app.listen(3000);
}
bootstrap();
