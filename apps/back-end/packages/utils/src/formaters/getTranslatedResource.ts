export type TranslationResource<TResource> = {
  langId: string;
  value: TResource;
};

export function getTranslatedResource<TResource>({
  fallbackLangId = "fr",
  langId,
  resource,
}: {
  resource: TranslationResource<TResource>[];
  langId: string;
  fallbackLangId?: string;
}): TResource | null {
  if (!Array.isArray(resource)) return null;
  if (resource.length === 0) return null;
  if (resource.length === 1) return resource[0].value;

  let targetedResource = resource.find((v) => v.langId === langId);

  if (!targetedResource)
    targetedResource = resource.find((v) => v.langId === fallbackLangId);

  if (!targetedResource) {
    return resource[0].value;
  }

  return targetedResource.value;
}
