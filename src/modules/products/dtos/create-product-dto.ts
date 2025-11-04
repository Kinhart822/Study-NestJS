import { IsBoolean, IsNumber, IsOptional, IsString, Length, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class isUpperCase implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    // Custom validation logic
    console.log(args);
    return text === text.toUpperCase();
  }
}

export default class CreateProductDto {
  @IsString({ message: 'Product name must be a string' })
  @Length(1, 100, { message: 'Product name must be between 1 and 100 characters' })
  @Validate(isUpperCase, { message: 'Product name must be uppercase' })
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
