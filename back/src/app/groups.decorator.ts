import { ReflectMetadata } from '@nestjs/common';

export const Groups = (...groups: string[]) =>
  ReflectMetadata('groups', groups);
