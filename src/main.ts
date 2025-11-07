import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';
import { AllExceptionFilter } from './exceptions/http-exception.filter';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { winstonLogger } from './logger/winston.logger';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  // Use Logging Middleware cho tất cả các route
  // app.use(new LoggingMiddleware().use);
  app.use(new LoggerMiddleware().use);

  // Use Global Filters
  app.useGlobalFilters(new AllExceptionFilter());

  // Use Global Pipe for Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error: ValidationError) => ({
            // field: error?.property ?? 'unknown',
            error: error?.constraints
              ? Object.values(error.constraints).join(', ')
              : 'validation error',
          })),
        );
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
