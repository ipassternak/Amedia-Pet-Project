import { IsNotEmpty, IsString } from 'class-validator'

export class ContentDataDto {
  @IsString()
  @IsNotEmpty()
  htmlText: string
}
