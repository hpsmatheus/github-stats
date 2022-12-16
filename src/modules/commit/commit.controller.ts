import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponse } from 'src/core/swagger-response';
import GetCommitParamsDto from 'src/typings/commit/get-commit.params.dto';
import GetCommitResponse from 'src/typings/commit/get-commit.response.dto';
import CommitService from './commit.service';

@Controller('commits')
@ApiTags('Cart')
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
