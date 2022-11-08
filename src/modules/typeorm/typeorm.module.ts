import { Module } from '@nestjs/common';
import { databaseProvider } from './typeorm.provider';


@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}