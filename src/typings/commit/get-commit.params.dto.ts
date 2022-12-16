import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class GetCommitParamsDto {
  @IsString()
  @ApiProperty({ example: 'nestjs/nest' })
  repoPath: string;

  @IsString()
  @ApiProperty({ example: '2022-11-01' })
  initialDate: string;

  @IsString()
  @ApiProperty({ example: '2022-12-01' })
  finalDate: string;
}
