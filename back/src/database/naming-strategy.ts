import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { camelCase } from 'typeorm/util/StringUtils';

export class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : targetName;
  }
}
