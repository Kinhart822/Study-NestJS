import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { PublicRoutesEnum } from 'src/constants/public.route';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Reflector là class cho phép truy cập metadata của các route,
  //      như metadata mà gắn bằng SetMetadata.
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.route?.path; // Lấy path hiện tại (VD: /auth/login)

    // Kiểm tra nếu route hiện tại nằm trong enum public
    console.log(path);
    if (Object.values(PublicRoutesEnum).includes(path)) {
      return true; // Bỏ qua xác thực
    }

    // Đọc metadata isPublic từ method hoặc controller
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // hàm hiện đang xử lý request (VD: login())
      context.getClass(), // Lấy ra class controller hiện tại (VD: AuthController)
    ]);

    if (isPublic) {
      return true;
    }

    // Gọi logic của AuthGuard('jwt') (class cha) → xác thực token qua JwtStrategy
    return super.canActivate(context);
  }
}
