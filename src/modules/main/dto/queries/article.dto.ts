import { IsDateString, IsOptional, IsString } from 'class-validator'

export class ArticleQueryDto {
  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  searchTerm?: string

  @IsOptional()
  @IsDateString()
  publishedBefore?: string

  @IsOptional()
  @IsDateString()
  publishedAfter?: string
}
