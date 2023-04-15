import React from "react";
import { startCase } from "lodash";
import * as yup from "yup";

export function useForm<TForm>(
  initial: TForm,
  constents?: Partial<TForm>,
  options?: {
    addLabel?: boolean;
    addPlaceholder?: boolean;
    yupSchema?: yup.AnyObjectSchema;
  }
) {
  const [data, setData] = React.useState<TForm>(initial);

  const [errors, setErros] = React.useState<Record<string, string>>({});

  const schema = options?.yupSchema;

  function handleChange<Tkey extends keyof TForm, Tvalue extends TForm[Tkey]>(
    key: Tkey,
    v: Tvalue
  ) {
    setData((old) => {
      const newV = { ...old, [key]: v, ...constents };
      if (schema) {
        const res = schema.validateSync(newV);

        // TODO: get errors and setErrros with the key:error pair
      }

      return newV;
    });
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

      placeholder:
        options?.addPlaceholder && typeof key === "string"
          ? startCase(key)
          : undefined,
      errorMessage: errors[key as string],
    };
  }

  function translationInputProps<Tkey extends keyof TForm>(
    key: Tkey,
    lang: string,
    valueKey: string = "value",
    onChangeKey: string = "onChange",
    mapOnChange: (value: any) => any = (e) => e.target.value
  ) {
    if (!data) return {};
    const stateTrans = (data[key] as { langId: string; value: any }[]) || [];
    const value = stateTrans.find((v) => v.langId === lang)?.value || "";

    const onChange = (e: any) => {
      const value = mapOnChange(e);
      console.log(stateTrans);
      handleChange(key, [
        ...stateTrans.filter((v) => v.langId !== lang),
        { langId: lang, value },
      ]);
    };

    console.log({ data });

    return {
      [valueKey]: value,
      [onChangeKey]: onChange,
      label:
        options?.addLabel && typeof key === "string"
          ? startCase(key)
          : undefined,

      placeholder:
        options?.addPlaceholder && typeof key === "string"
          ? startCase(key)
          : undefined,
      errorMessage: errors[key as string],
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
      errorMessage: errors[key as string],
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
      errorMessage: errors[key as string],
    };
  }

  function switchInputProps<Tkey extends keyof TForm>(
    key: Tkey,
    valueKey: string = "checked",
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
      errorMessage: errors[key as string],
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
    translationInputProps,
  };
}
