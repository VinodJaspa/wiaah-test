export function getTranslatedResource<TResource>({
  fallbackLangId = "fr",
  langId,
  resource,
}: {
  resource: { langId: string; value: TResource }[];
  langId: string;
  fallbackLangId?: string;
}): TResource {
  if (!Array.isArray(resource)) return undefined;
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
