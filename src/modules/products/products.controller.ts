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
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ProductsService } from './products.service';
import CreateProductDto from './dtos/create-product-dto';
import UpdateProductDto from './dtos/update-product-dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

export class CustomProductValidationPipe implements PipeTransform<any> {
  // Custom Pipe cx có thể truy cập Request object
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  // Can thiệp – Xử lý – Biến đổi (transform) hoặc Kiểm tra (validate) dữ liệu
  transform(value: any, metadata: ArgumentMetadata) {
    // Value: Dữ liệu đầu vào cần xử lý
    // VD:   @Body() → body JSON
    //       @Param('id') → giá trị id trong URL
    //       @Query() → query string trong URL
    // Metadata: Thông tin về dữ liệu đầu vào (loại dữ liệu, vị trí dữ liệu,...)
    console.log('Custom Product ValidationPipe:', metadata);

    // Lấy param từ request (vd: /products/:id)
    const id = (this.request as any)?.params?.id;
    console.log('Request ID Param:', id);

    const name = value?.name;
    if ((name && name.length < 3) || id === '0') {
      throw new BadRequestException(
        'Product name must be at least 3 characters long and ID cannot be 0',
      );
    }

    // Nếu hợp lệ → trả về value (sẽ truyền vào controller)
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

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request & { user: string}) {
    console.log('Request Headers:', req.headers);
    console.log('User:', req.user);
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
  create(@Body(CustomProductValidationPipe) productData: CreateProductDto) {
    return this.productsService.create(productData);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() productData: Partial<Product>) {
  //   return this.productsService.update(id, productData);
  // }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(CustomProductValidationPipe) productData: UpdateProductDto,
  ) {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
