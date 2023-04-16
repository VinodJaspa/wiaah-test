import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from "class-validator";

export function IsValidTranslationArray(
  requiredLanguages: string[] = [],
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsValidTranslationArray",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [[...requiredLanguages.filter((v) => v !== "en"), "en"]],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const langs = args.constraints[0] as string[];

          if (!Array.isArray(value)) return false;

          if (value.every((v) => typeof v.langId === "string")) return false;

          if (!langs.every((v) => !!value.find((e) => e.langId === v)))
            return false;

          return true;
        },
      },
    });
  };
}
