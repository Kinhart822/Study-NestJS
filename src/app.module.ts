import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
// import { LoggingMiddleware } from './middleware/logging/logging.middleware';
// import { RoleMiddleware } from './middleware/role/role.middleware';
import { JwtUserModule } from './modules/jwt-user/jwt-user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LocalStrategy } from './passports/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'kinhart822',
    //   database: 'test',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'], // Danh sách các entity được ánh xạ
    //   synchronize: true, // Auto-create/update tables based on entities (use with caution in production)
    // }),
    JwtUserModule,
    AuthModule,
    UserModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggingMiddleware, RoleMiddleware)
  //     .forRoutes('*');
  // .forRoutes(
  //   {
  //     path: '/products/*',
  //     method: RequestMethod.ALL,
  //   },
  //   {
  //     path: '/products',
  //     method: RequestMethod.ALL,
  //   },
  // );
  // }
}
