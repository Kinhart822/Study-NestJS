import { SetMetadata } from '@nestjs/common';

// - SetMetadata(key, value) là hàm của NestJS giúp gắn dữ liệu ẩn vào route.
//      Ở đây, key là 'isPublic', value là true.
// - Khi gắn @Public() lên một route, NestJS rằng route này không cần kiểm 
//     tra JWT.
// - Chú ý khi dùng decorator này thì mới báo gắn metadata isPublic = true 
//      lên method chưa xử lý logic (JwtAuthGuard sẽ xử lý hộ)
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);