import { DeepPartial, updateDeepObject } from "../";

export function mergeObjectArray<
  TOriginal,
  TCompareKey extends keyof TOriginal = keyof TOriginal,
  TUpdate extends DeepPartial<Omit<TOriginal, TCompareKey>> &
    Record<TCompareKey, any> = DeepPartial<Omit<TOriginal, TCompareKey>> &
    Record<TCompareKey, any>
>({
  originalData,
  updateData,
  compareKey,
}: {
  originalData: TOriginal[];
  updateData: any [];
  compareKey: TCompareKey;
}) {
  const __existingObjects: {
    og: TOriginal;
    update: TUpdate;
  }[] = [];
  const newObjects: TUpdate[] = [];

  updateData.forEach((v) => {
    const idx = originalData.findIndex(
      // @ts-ignore
      (ogV) => ogV[compareKey] === v[compareKey]
    );
    if (idx > -1) {
      __existingObjects.push({
        og: originalData[idx],
        update: v,
      });
    } else {
      newObjects.push(v);
    }
  });
  const unTouchedObjects: TOriginal[] = originalData.filter(
    (v) =>
      __existingObjects.findIndex((eV) => eV.og[compareKey] === v[compareKey]) <
      0
  );

  const existingObjects = __existingObjects.map((v) =>
    //@ts-ignore
    updateDeepObject({ inputObj: v.og, updateObj: v.update })
  );

  return {
    existingObjects,
    unTouchedObjects,
    newObjects,
    all: [...unTouchedObjects, ...existingObjects, ...newObjects],
  };
}
