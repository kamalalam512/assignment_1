import { ApiProperty } from '@nestjs/swagger';

export class SearchListDTO {
  @ApiProperty()
  search: string;
  static search: string;
}
