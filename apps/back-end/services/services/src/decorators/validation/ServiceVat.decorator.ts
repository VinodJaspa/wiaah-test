import { SERVICE_MAX_VAT_PERCENT, SERVICE_MIN_VAT_PERCENT } from '@const';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class ServiceVatPercentValidationClass
  implements ValidatorConstraintInterface
{
  validate(vat: number, args: ValidationArguments) {
    const valid: boolean[] = [];
    if (vat < SERVICE_MIN_VAT_PERCENT) valid.push(false);
    if (vat > SERVICE_MAX_VAT_PERCENT) valid.push(false);

    return valid.every((v) => v);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Vat percent must be larger than ${SERVICE_MIN_VAT_PERCENT} and less than ${SERVICE_MAX_VAT_PERCENT}!`;
  }
}

export function ServiceVatPercent(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ServiceVatPercentValidationClass,
    });
  };
}
