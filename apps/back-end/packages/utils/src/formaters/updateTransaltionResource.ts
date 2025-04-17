import { DeepPartial } from "../";
import { TranslationResource } from "./getTranslatedResource";
import { updateDeepObject } from "./updateDeepObject";

type UpdateTranslationResourceOptions<T> = {
  originalObj: TranslationResource<T>[];
  update: TranslationResource<DeepPartial<T>>[];
  updateOnly?: boolean;
};

export function updateTranslationResource<TResource extends Record<string, any>>({
  originalObj,
  update,
}: UpdateTranslationResourceOptions<TResource>):
  | TranslationResource<TResource>[]
  | undefined {
  if (!Array.isArray(originalObj) || !Array.isArray(update)) return undefined;
  if (originalObj.length < 1 || update.length < 1) return originalObj;

  let updatedTranslations: TranslationResource<TResource>[] = [];

  const updates = update.filter(
    (v) => originalObj.findIndex((iV) => iV.langId === v.langId) > -1
  );

  const unTouched = originalObj.filter(
    (v) => updates.findIndex((uV) => uV.langId === v.langId) < 0
  );

  updates.forEach((v) => {
    const inputObj =
      originalObj.find((iV) => iV.langId === v.langId)?.value ??
      ({} as TResource);
    updatedTranslations.push({
      langId: v.langId,
      value: updateDeepObject({
        inputObj,
        updateObj: v.value,
      }) as TResource,
    });
  });

  return unTouched.concat(updatedTranslations);
}
