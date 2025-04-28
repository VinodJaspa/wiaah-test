import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

export function IsDomain(
  domains: string[],
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isLongerThan",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [domains],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const domains = args.constraints[0] as string[];
          const valid = isValidUrl(value);

          if (valid) {
            const url = new URL(value);
            const host = url.hostname;

            return valid && domains.includes(host);
          }

          return false;
        },
      },
    });
  };
}
