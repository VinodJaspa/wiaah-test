import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

type Primitives = string | number | boolean;

export function FieldRequired(
  property: string,
  value: Primitives | Primitives[],
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "FieldRequired",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property, value],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName, expectedValue] = args.constraints as [
            string,
            Primitives | Primitives[]
          ];
          const relatedValue = (args.object as any)[relatedPropertyName];

          if (Array.isArray(expectedValue)) {
            if (!expectedValue.includes(relatedValue) && !!value) return false;
          } else {
            if (relatedValue !== expectedValue && !!value) return false;
          }

          if (Array.isArray(expectedValue)) {
            if (expectedValue.includes(relatedValue) && !value) return false;
          } else {
            if (relatedValue === expectedValue && !value) return false;
          }

          return true;
        },
      },
    });
  };
}
