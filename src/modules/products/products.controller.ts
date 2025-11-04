import {
  // BadRequestException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  // UsePipes,
  Body,
  Param,
  ParseIntPipe,
  ArgumentMetadata,
  PipeTransform,
  Inject,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import CreateProductDto from './dtos/create-product-dto';
// import { ValidationError } from 'class-validator';

export class CustomValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    // Custom transformation and validation logic
    console.log('Custom ValidationPipe:', metadata);
    return value;
  }
}

@Controller('products')
// @UsePipes(new ValidationPipe({ transform: true }))
// @UsePipes(
//   new ValidationPipe({
//     transform: true,
//     exceptionFactory: (validationErrors: ValidationError[] = []) => {
//       return new BadRequestException(
//         validationErrors.map((error: ValidationError) => ({
//           // field: error?.property ?? 'unknown',
//           error: error?.constraints
//             ? Object.values(error.constraints).join(', ')
//             : 'validation error',
//         })),
//       );
//     },
//   }),
// )
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // @Get(':id')
  // async findById(@Param('id') id: number) {
  //   const product = await this.productsService.findById(id);
  //   if (!product) {
  //     throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  //   }
  //   return product;
  // }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.productsService.findById(id);
  // }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.productsService.findById(id);
  }

  // transform: true giúp tự động biến đổi plain object (JSON request body) thành instance của class CreateProductDto
  // @Post()
  // create(@Body(new ValidationPipe({ transform: true })) dto: CreateProductDto) {
  //   console.log(dto instanceof CreateProductDto); // true
  // }

  @Post()
  create(@Body(new CustomValidationPipe()) productData: CreateProductDto) {
    return this.productsService.create(productData);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() productData: Partial<Product>) {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
