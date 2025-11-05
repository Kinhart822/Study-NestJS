import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`${req.method} ${req.originalUrl}`);
    console.log(`${res.statusCode}`);
    req.user = 'Middleware User';

    let isAuth = true;
    if(!isAuth){
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'You are not authorized to access this resource'
      });
    }
    next();
  }
}
