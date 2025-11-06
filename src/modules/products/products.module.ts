import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { RoleMiddleware } from 'src/middleware/role/role.middleware';
import { LoggingMiddleware } from 'src/middleware/logging/logging.middleware';

@Module({
  imports: [
    // Add any necessary imports here
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggingMiddleware)
  //     .forRoutes(
  //       {
  //         path: '/products/*',
  //         method: RequestMethod.ALL,
  //       },
  //       // Phải thêm chứ không sẽ không bắt được route /products
  //       {
  //         path: '/products',
  //         method: RequestMethod.ALL,
  //       },
  //     );
  // }
}
