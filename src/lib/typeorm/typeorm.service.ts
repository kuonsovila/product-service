import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import * as Entities from '../../entites';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'productdb',
      entities: Object.values(Entities),
      //   logging: process.env.DB_LOGGING === 'true' ? true : false,
      //   synchronize: process.env.DB_SYNC === 'true' ? true : false,
      synchronize: true,
    };
  }
}
