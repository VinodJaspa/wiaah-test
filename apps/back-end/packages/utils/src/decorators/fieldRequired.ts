import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function FieldRequired(
  property: string,
  value: string | number | boolean,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isPropertyEqual",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property, value],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName, expectedValue] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          console.log({ relatedPropertyName, expectedValue, relatedValue });

          if (relatedValue !== expectedValue && !!value) return false;

          if (relatedValue === expectedValue && !value) return false;

          return true;
        },
      },
    });
  };
}
