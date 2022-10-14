import { Module } from '@nestjs/common';
import { BaseModule } from './api/base.module';
import { TypeOrmModule } from './lib/typeorm';
// import * as Entities from './entites/index';

@Module({
  imports: [TypeOrmModule, BaseModule],
})
export class AppModule {}
