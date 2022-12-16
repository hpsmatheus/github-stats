import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import CommitModule from './modules/commit/commit.modules';

@Module({
  imports: [ConfigModule.forRoot(), CommitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
