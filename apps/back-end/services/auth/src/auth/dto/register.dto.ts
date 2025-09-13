import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
export enum RegisterAccountType {
  seller = 'seller',
  buyer = 'buyer',
}
registerEnumType(RegisterAccountType, { name: 'RegisterAccountType' });

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function OlderThan(date: Date, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MaxWords',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [date],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [date] = args.constraints;

          if (isNaN(Date.parse(new Date(value).toString()))) return false;
          if (date! instanceof Date) return false;

          return new Date(value) < date;
        },
      },
    });
  };
}

@InputType()
export class RegisterDto {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  @IsEmail()
  email: string;

  @OlderThan(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), {
    message: 'You must be older than 18 years old to use wiaah',
  })
  @Field(() => String)
  birthDate: string;

  @Field((type) => RegisterAccountType)
  accountType: RegisterAccountType;

  @Field((type) => String)
  password: string;
  
}
@InputType()
export class ResendRegisterationCodeInput {
  @Field()
  @IsEmail()
  email: string;
}
