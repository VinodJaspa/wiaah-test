export function getTranslatedResource<TResource>({
  fallbackLangId = "fr",
  langId,
  resource,
}: {
  resource: { langId: string; value: TResource }[];
  langId: string;
  fallbackLangId?: string;
}): TResource {
  console.log("get", resource, resource.length);

  if (resource.length === 0) throw new Error("empty translation resource");
  if (resource.length === 1) return resource[0].value;

  let targetedResource = resource.find((v) => v.langId === langId);

  if (!targetedResource)
    targetedResource = resource.find((v) => v.langId === fallbackLangId);

  if (!targetedResource) {
    console.log("falling back to the frist ");
    return resource[0].value;
  }

  console.log("found targeted language");

  return targetedResource.value;
}
