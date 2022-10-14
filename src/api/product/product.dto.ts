import { E } from '../../common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  sortOrder: number;

  @IsNotEmpty()
  @IsEnum(E.StatusEnum)
  @ApiProperty({ type: 'enum', enum: E.StatusEnum })
  status: E.StatusEnum;
}
export class UpdateProdcutBody {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;
}
export class GetProductById {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  id: number;
}

export class UpdateProductParam {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'number' })
  id: number;
}

export class DeleteProductById {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'number' })
  id: number;
}
