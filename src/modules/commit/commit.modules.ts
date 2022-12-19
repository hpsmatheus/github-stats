import { Module } from '@nestjs/common';
import GitHubClient from '../../clients/github.client';
import CommitController from './commit.controller';
import CommitService from './commit.service';

@Module({
  controllers: [CommitController],
  providers: [CommitService, GitHubClient],
})
export default class CommitModule {}
