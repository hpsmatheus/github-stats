import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponse } from '../../core/swagger-response';
import GetCommitParamsDto from '../../typings/commit/get-commit.params.dto';
import GetCommitResponse from '../../typings/commit/get-commit.response.dto';
import CommitService from './commit.service';

@Controller('commits')
@ApiTags('Commits')
export default class CommitController {
  constructor(private readonly commitService: CommitService) {}

  @Get()
  @ApiResponse(SwaggerResponse.Ok([GetCommitResponse]))
  @ApiResponse(SwaggerResponse.InputValidationError)
  @ApiResponse(SwaggerResponse.InternalError)
  public async getCommits(
    @Query() params: GetCommitParamsDto,
  ): Promise<GetCommitResponse[]> {
    return this.commitService.getCommits(params);
  }
}
