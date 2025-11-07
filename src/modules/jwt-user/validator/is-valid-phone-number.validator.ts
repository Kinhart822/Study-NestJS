import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const vietnamesePhoneNumberRegex = /^(?:\+84|84|0|0084)(?:3|5|7|8|9)\d{8}$/;

@ValidatorConstraint({ name: 'isValidPhoneNumber', async: true })
export class IsValidPhoneNumber implements ValidatorConstraintInterface {
  async validate(phoneNumber: string, args: ValidationArguments): Promise<boolean> {
   return vietnamesePhoneNumberRegex.test(phoneNumber);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Phone number is invalid or already exists';
  }
}
