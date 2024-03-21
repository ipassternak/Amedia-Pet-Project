import { Transform } from 'class-transformer'
import { IsArray, IsString } from 'class-validator'

export class MetaDataDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsArray()
  @Transform(({ value }) => value.split(', ').map((keyword: string) => keyword.trim()))
  keywords: string[]

  @IsString()
  ogTitle: string

  @IsString()
  ogDescription: string

  @IsString()
  ogImageUrl: string
}
