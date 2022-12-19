import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import CommitModule from '../../src/modules/commit/commit.modules';
import AppFactory from '../mocks/core/app.builder';
import supertest from 'supertest';
import GetCommitParamsDto from '../../src/typings/commit/get-commit.params.dto';
import Constants from '../constants';
import axios from 'axios';
import { gitHubClientCommitResponseMock } from '../mocks/clients/github-client-commit.response.mock';
import { getCommitResponseMock } from '../mocks/get-commit.response.mock';
import { EErrorCode } from '../../src/core/error/error-code.enum';

describe('Commits integration tests', () => {
  let app: INestApplication;

  const params: GetCommitParamsDto = {
    initialDate: Constants.anyDateString,
    finalDate: Constants.anyDateString,
    repoPath: Constants.anyRepoPath,
  };

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [CommitModule],
    }).compile();

    app = await AppFactory.build(testingModule);
    jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce(gitHubClientCommitResponseMock);
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [] });
  });

  it('should retrive commits from a repo given a period', async () => {
    const result = await supertest(app.getHttpServer())
      .get('/commits')
      .query(params);
    expect(result.statusCode).toStrictEqual(HttpStatus.OK);
    expect(result.body).toStrictEqual(getCommitResponseMock);
  });

  it('should return 400 to requests with invalid payload', async () => {
    const result = await supertest(app.getHttpServer()).get('/commits');
    expect(result.status).toBe(HttpStatus.BAD_REQUEST);
    expect(result.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(result.body.errorCode).toBe(EErrorCode.INPUT_VALIDATION_ERROR);
    expect(result.body.message).toStrictEqual(
      'errors occurred during input validation',
    );
    expect(result.body.data).toStrictEqual({
      errors: [
        'repoPath must be a string',
        'initialDate must be a string',
        'finalDate must be a string',
      ],
    });
  });

  it('should throw formatted exception when unexpected error happens', async () => {
    jest.resetAllMocks();
    jest.spyOn(axios, 'get').mockImplementationOnce(() => {
      throw new Error('generic error');
    });
    const result = await supertest(app.getHttpServer())
      .get('/commits')
      .query(params);

    expect(result.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result.body.errorCode).toBe(EErrorCode.INTERNAL_SERVER_ERROR);
    expect(result.body.message).toStrictEqual('generic error');
    expect(result.body.data).toBeDefined();
  });
});
