import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty()
  totalCount: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  nextPageCursor: number | null;
  @ApiProperty()
  prevPageCursor: null | number;
}

export class ArrayResponseApi<T> {
  @ApiProperty()
  statusCode?: number;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  data: T[];
  @ApiProperty({ type: Meta })
  meta: Meta;
}

export class ObjectResponseApi<T> {
  @ApiProperty({
    type: Number,
    description: 'HTTP status code',
    enum: [200, 201, 202, 203, 204, 205, 206],
    examples: [200, 201, 202, 203, 204, 205, 206],
  })
  statusCode?: number;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  data: T;
}

// ref https://nodeteam.medium.com/nest-js-prisma-pagination-b776592f1867

export class meta {
  @ApiProperty()
  total: number;
  @ApiProperty()
  lastPage: number;
  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  perPage: number;
  @ApiProperty()
  prev: number | null;
  @ApiProperty()
  next: number | null;
}

export class PaginatedResult<T> {
  @ApiProperty()
  statusCode?: number;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  data: T[];

  @ApiProperty({ type: meta })
  meta: meta;
}

export type PaginateOptions = { page?: number | string; perPage?: number | string };
export type PaginateFunction = <T, K>(
  model: any,
  args?: K & { include?: any },
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export const paginator = (defaultOptions: PaginateOptions): PaginateFunction => {
  return async (model, args: any, options) => {
    const page = Number(options?.page || defaultOptions.page) || 1;
    const perPage = Number(options?.perPage || defaultOptions.perPage) || 10;

    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ]);

    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  };
};
