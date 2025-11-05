import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use Logging Middleware cho tất cả các route
  // app.use(new LoggingMiddleware().use);

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
