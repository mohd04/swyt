import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Query, Req, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OptionalIntPipe } from './helper/optional-int.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './helper/multer.config';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('categories')
  getCategories(
    @Query('take', OptionalIntPipe) take?: number,
    @Query('page', OptionalIntPipe) page?: number,
  ){
    return this.appService.getCategories({ take, page });
  }

  @Post(':id/picture')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadProfilePhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: (1024 * 1024) * 2 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return await this.appService.updatePicture(
      id,
      image.filename,
    );
  }

  @Post()
  createProduct(
    @Body(ValidationPipe) data: CreateProductDto
  ){
    console.log(data);
    return this.appService.createProduct(data);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateProductDto
  ){
    return this.appService.updateProduct(id, data);
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number){
    return this.appService.getProduct(id);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number){
    return this.appService.deleteProduct(id);
  }

  @Get('')
  getProducts(
    @Query('take', OptionalIntPipe) take?: number,
    @Query('page', OptionalIntPipe) page?: number,
  ){
    return this.appService.getProducts({ take, page});
  }
}
