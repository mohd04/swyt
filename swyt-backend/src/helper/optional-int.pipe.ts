import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/** Convert a string like "1" to a number, but without NaN */
@Injectable()
export class OptionalIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number | undefined {
    if (value == null) return undefined;
    const num = Number(value);
    if (isNaN(num) && typeof metadata.data === 'string') {
      throw new BadRequestException('400014: $key should be a number'.replace('$key', metadata.data));
    }
    return num;
  }
}
