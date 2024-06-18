import { IsUrl, IsString, IsNotEmpty } from 'class-validator';

export class UrlInput {
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  url: string;
}
