import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from 'src/configs/db.config';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: async (configService: ConfigService) => ({
      //   type: 'postgres',
      //   host: configService.get<string>('DB_HOST'),
      //   port: Number.parseInt(configService.getOrThrow<string>('DB_PORT')),
      //   username: configService.get<string>('DB_USERNAME'),
      //   password: configService.get<string>('DB_PASSWORD'),
      //   database: configService.get<string>('DB_NAME'),
      //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      //   synchronize: true,
      //   logging: true,
      // }),
      useFactory: (configService: ConfigService) => {
        const options = configService.get('typeorm');
        console.log('Options là:' + JSON.stringify(options));
        if (!options) {
          throw new Error('Missing TypeORM configuration (typeorm)!');
        }
        return options;
      },
      async dataSourceFactory(options) {
        console.log('Options là:' + JSON.stringify(options));

        if (!options) {
          throw new Error('Invalid options passed');
        }

        // Bật tính năng Transactional để sử dụng decorator @Transactional
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
})
export class DatabaseModule {}
