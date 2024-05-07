import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { paginator } from './helper/pagination';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getCategories({ take = 10, page = 1 }: { take?: number; page?: number }) {
    try {
      const categoryFindMany: Prisma.CategoryFindManyArgs = {
        orderBy: {
          createdAt: 'asc'
        },
        select: {
          id: true,
          name: true,
        }
      }

      const paginatedCategories = await paginator({ page: page, perPage: take })(this.prisma.category, categoryFindMany, {
        page: page,
        perPage: take,
      });

      return paginatedCategories;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async createProduct(data: CreateProductDto) {
    try {
      return this.prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          brand: data.brand,
          size: data.size,
          image: '',
          categories: {
            connect: data.categories.map((category) => ({ id: category.id }))
          }
        },
        include: {
          categories: true
        }
      });
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    try {
      return this.prisma.product.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          categories: {
            set: data.categories.map((category) => ({ id: category.id }))
          }
        },
        include: {
          categories: true
        }
      });
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePicture(id: number, image: string) {
    try {
      return this.prisma.product.update({
        where: { id },
        data: {
          image: image
        }
      });
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProduct(id: number) {
    try {
      return this.prisma.product.delete({
        where: { id }
      });
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async getProduct(id: number) {
    try {
      return this.prisma.product.findUnique({
        where: { id },
        include: {
          categories: true
        }
      });
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async getProducts(
    {
      take = 10, // Default page size
      page = 1,
    }: {
      take?: number;
      page?: number;
    },
  ) {
    try {
      const productFindMany: Prisma.ProductFindManyArgs = {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          categories: true
        },
      }

      const paginatedProducts = await paginator({ page: page, perPage: take })(this.prisma.product, productFindMany, {
        page: page,
        perPage: take,
      });

      return paginatedProducts;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
