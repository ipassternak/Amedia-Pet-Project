import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator'

export class ArticleQueryDto {
  @IsOptional()
  @IsUUID()
  categoryId?: string

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
