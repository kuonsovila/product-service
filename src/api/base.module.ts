import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ScheduleModule.forRoot(), ProductModule],
  controllers: [],
  providers: [],
})
export class BaseModule {}
