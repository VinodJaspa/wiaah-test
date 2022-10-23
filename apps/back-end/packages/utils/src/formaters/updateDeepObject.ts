interface options<
  TInputObj extends Object,
  TUpdateObj extends Partial<TInputObj>
> {
  inputObj: TInputObj;
  updateObj: TUpdateObj;
}

export function updateDeepObject<
  TInputObj extends Object,
  TUpdateObj extends Partial<TInputObj>
>({ inputObj, updateObj }: options<TInputObj, TUpdateObj>): TInputObj {
  const mergedObj: TInputObj = {} as TInputObj;
  for (const key in inputObj) {
    const keyValue = inputObj[key];
    if (typeof keyValue === "object" && typeof updateObj[key] === "object") {
      mergedObj[key] = updateDeepObject({
        inputObj: inputObj[key],
        updateObj: updateObj[key],
      });
    } else if (typeof updateObj[key] !== "undefined") {
      mergedObj[key] = updateObj[key];
    } else {
      mergedObj[key] = inputObj[key];
    }
  }

  return mergedObj;
}
