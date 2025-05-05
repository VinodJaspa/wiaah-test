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
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: "FieldRequired",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property, value],
      options: validationOptions,
      validator: {
        validate(currentValue: any, args: ValidationArguments) {
          const [relatedPropertyName, expectedValue] = args.constraints as [
            string,
            Primitives | Primitives[]
          ];
          const relatedValue = (args.object as any)[relatedPropertyName];

          // If the expected value is an array, check if the related value is included
          const isExpectedValueMatched = Array.isArray(expectedValue)
            ? expectedValue.includes(relatedValue)
            : relatedValue === expectedValue;

          // If the related value matches the expected value, the current value must be provided
          if (isExpectedValueMatched) {
            return currentValue !== undefined && currentValue !== null;
          }

          // If the related value doesn't match the expected value, allow current value to be empty
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName, expectedValue] = args.constraints;
          return `${args.property} is required when ${relatedPropertyName} is ${expectedValue}`;
        },
      },
    });
  };
}
