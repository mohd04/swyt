import { IsString, IsNumber, IsOptional, IsUrl, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CategoryIdDTO {
  @ApiProperty({
    description: 'Category ID',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  id: number;
}

export class UpdateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Product 1',
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Product 1 description',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Product price',
    example: 100,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/image.jpg',
    type: String,
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({
    description: 'Product categories',
    example: [{ id: 1 }],
    type: [CategoryIdDTO],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryIdDTO)
  categories?: CategoryIdDTO[];
}
