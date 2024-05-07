import { IsNotEmpty, IsNumber, IsString, IsUrl, IsOptional, Min, ArrayNotEmpty, IsArray, IsInt, ValidateNested, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '@prisma/client';

class CategoryIdDTO {
  @ApiProperty({
    description: 'Category ID',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Product 1',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Product 1 description',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  //euro shoe size
  @ApiProperty({
    description: 'Product size',
    example: 42,
    type: Number,
  })
  @IsNumber()
  @Min(36)
  @Max(48)
  size: number;

  //brand
  @ApiProperty({
    description: 'Product brand',
    enum: Brand,
  })
  @IsEnum(Brand)
  brand: Brand;

  @ApiProperty({
    description: 'Product price',
    example: 100,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Product categories',
    example: [{ id: 1 }],
    type: [CategoryIdDTO],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CategoryIdDTO)
  categories: CategoryIdDTO[];
}
