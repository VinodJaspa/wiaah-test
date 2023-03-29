import React from "react";
import { startCase } from "lodash";

export function useForm<TForm>(
  initial: TForm,
  constents?: Partial<TForm>,
  options?: { addLabel?: boolean }
) {
  const [data, setData] = React.useState<TForm>(initial);

  function handleChange<Tkey extends keyof TForm, Tvalue extends TForm[Tkey]>(
    key: Tkey,
    v: Tvalue
  ) {
    setData((old) => ({ ...old, [key]: v, ...constents }));
  }

  function inputProps<Tkey extends keyof TForm>(
    key: Tkey,
    valueKey: string = "value",
    onChangeKey: string = "onChange",
    mapOnChange: (value: any) => any = (e) => e.target.value
  ) {
    if (!data) return {};
    return {
      [valueKey]: data[key] as TForm[Tkey],
      [onChangeKey]: (e: any) => handleChange(key, mapOnChange(e)),
      label:
        options?.addLabel && typeof key === "string"
          ? startCase(key)
          : undefined,
    };
  }

  function selectProps<Tkey extends keyof TForm>(
    key: Tkey,
    valueKey: string = "value",
    onChangeKey: string = "onOptionSelect",
    mapOnChange: (value: any) => any = (e) => e
  ) {
    if (!data) return {};
    return {
      [valueKey]: data[key] as TForm[Tkey],
      [onChangeKey]: (e: any) => handleChange(key, mapOnChange(e)),
      label:
        options?.addLabel && typeof key === "string"
          ? startCase(key)
          : undefined,
    };
  }

  function dateInputProps<Tkey extends keyof TForm>(
    key: Tkey,
    valueKey: string = "dateValue",
    onChangeKey: string = "onDateChange",
    mapOnChange: (value: any) => any = (e) => e
  ) {
    if (!data) return {};
    return {
      [valueKey]: data[key] as TForm[Tkey],
      [onChangeKey]: (e: any) => handleChange(key, mapOnChange(e)),
      label:
        options?.addLabel && typeof key === "string"
          ? startCase(key)
          : undefined,
    };
  }

  function switchInputProps<Tkey extends keyof TForm>(
    key: Tkey,
    valueKey: string = "value",
    onChangeKey: string = "onChange",
    mapOnChange: (value: any) => any = (e) => e
  ) {
    if (!data) return {};
    return {
      [valueKey]: data[key] as TForm[Tkey],
      [onChangeKey]: (e: any) => handleChange(key, mapOnChange(e)),
      label:
        options?.addLabel && typeof key === "string"
          ? startCase(key)
          : undefined,
    };
  }

  return {
    form: data,
    handleChange,
    inputProps,
    selectProps,
    dateInputProps,
    switchInputProps,
    setValue: (v: TForm) => setData({ ...v, constents }),
  };
}
