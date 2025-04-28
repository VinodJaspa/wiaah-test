import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from "class-validator";

export function IsValidTranslationArray(
  requiredLanguages: string[] = [],
  validationOptions?: ValidationOptions
) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: "IsValidTranslationArray",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [[...requiredLanguages.filter((v) => v !== "en"), "en"]],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const requiredLangs = args.constraints[0] as string[];

          // Check if value is an array
          if (!Array.isArray(value)) return false;

          // Check if each element in the array has a valid langId
          if (!value.every((v) => typeof v.langId === "string")) return false;

          // Ensure that all required languages are present in the array
          const hasAllRequiredLangs = requiredLangs.every((lang) =>
            value.some((v) => v.langId === lang)
          );

          return hasAllRequiredLangs;
        },
        defaultMessage(args: ValidationArguments) {
          const requiredLangs = args.constraints[0] as string[];
          return `${args.property
            } must contain translations for the following languages: ${requiredLangs.join(
              ", "
            )}`;
        },
      },
    });
  };
}
