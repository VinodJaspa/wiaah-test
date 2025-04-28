import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class ServiceLanguagesValidationClass
  implements ValidatorConstraintInterface
{
  validate(arry: { langId: string; value: any }[], args: ValidationArguments) {
    const valid: boolean[] = [];

    if (arry.length < 1) valid.push(false);

    const formated = arry.reduce(
      (acc, curr) => {
        return { ...acc, [curr.langId]: (acc[curr.langId] || 0) + 1 };
      },
      {} as Record<string, number>,
    );

    const duplicationValid: boolean = Object.entries(formated)
      .map(([_, v]) => v)
      .every((v) => v < 2);

    if (!duplicationValid) valid.push(false);

    return valid.every((v) => !!v);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Array ${args.property} is too short or too long!`;
  }
}

export function TranslationsInput(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ServiceLanguagesValidationClass,
    });
  };
}
