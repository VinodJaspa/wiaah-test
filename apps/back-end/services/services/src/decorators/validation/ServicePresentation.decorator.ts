import {
  SERVICE_PRESENTATION_MAX_CONTENT_UPLOAD_LIMIT,
  SERVICE_PRESENTATION_MIN_CONTENT_UPLOAD_LIMIT,
} from '@const';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class ServicePresentationsLengthValidationClass
  implements ValidatorConstraintInterface
{
  validate(arry: any[], args: ValidationArguments) {
    const valid: boolean[] = [];
    const arrLeng = arry.length;
    if (arrLeng < SERVICE_PRESENTATION_MIN_CONTENT_UPLOAD_LIMIT)
      valid.push(false);
    if (arrLeng > SERVICE_PRESENTATION_MAX_CONTENT_UPLOAD_LIMIT)
      valid.push(false);

    return valid.every((v) => v);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Array ${args.property} is too short or too long!`;
  }
}

export function ServicePresentationsLength(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ServicePresentationsLengthValidationClass,
    });
  };
}
