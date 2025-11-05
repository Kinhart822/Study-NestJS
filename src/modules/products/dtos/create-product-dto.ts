import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Custom validation class,
@ValidatorConstraint()
export class IsUpperCase implements ValidatorConstraintInterface {
  // - Validator này nhận giá trị cần kiểm tra (ở đây là text) và trả về true hoặc false
  // - ValidationArguments là một object chứa các thông tin bổ sung khi validation được chạy.
  // Gồm các thuộc tính:
  //   * targetName: 	Tên class DTO đang được validate
  //   * property:  	Tên thuộc tính đang được kiểm tra (ví dụ: name)
  //   * object:	    Toàn bộ object đang được validate
  //   * value:	      Giá trị của thuộc tính đó
  //   * constraints:	Các tham số phụ được truyền vào validator (nếu có, qua @Validate() decorator)
  validate(text: string, args: ValidationArguments) {
    // Custom validation logic
    console.log(args);
    return text === text.toUpperCase();
  }
}

export default class CreateProductDto {
  @IsString({ message: 'Product name must be a string' })
  @Length(1, 100, {
    message: 'Product name must be between 1 and 100 characters',
  })
  @Validate(IsUpperCase, { message: 'Product name must be uppercase' })
  name: string;

  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean;
}
