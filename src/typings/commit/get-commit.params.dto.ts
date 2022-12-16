import { IsString } from 'class-validator';

export default class GetCommitParamsDto {
  @IsString()
  repoPath: string;

  @IsString()
  initialDate: string;

  @IsString()
  finalDate: string;
}
