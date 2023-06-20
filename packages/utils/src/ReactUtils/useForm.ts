import React from "react";
import { startCase } from "lodash";
import * as yup from "yup";

type ValidationFormErrors<T> = Record<keyof T, string>;

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

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const schema = options?.yupSchema;

  function validate(): [boolean, Record<string, string>] {
    try {
      const validationSchema = options?.yupSchema;

      if (validationSchema) {
        validationSchema.validateSync(data, {
          abortEarly: false,
        });
      }
      return [true, {} as ValidationFormErrors<TForm>];
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce((acc, curr) => {
          if (curr instanceof yup.ValidationError) {
            return { ...acc, [curr.path!]: curr.message };
          } else return acc;
        }, {}) as ValidationFormErrors<TForm>;

        return [false, errors];
      } else {
        return [false, { unknown: "unknown" } as ValidationFormErrors<TForm>];
      }
    }
  }

  function handleChange<Tkey extends keyof TForm, Tvalue extends TForm[Tkey]>(
    key: Tkey,
    v: Tvalue
  ) {
    setData((old) => {
      const newV = { ...old, [key]: v, ...constents };
      if (schema) {
        // TODO: get errors and setErrros with the key:error pair
        const [valid, errors] = validate();
        setErrors(errors);
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

  function radioInputProps<Tkey extends keyof TForm>(
    key: Tkey,
    valueKey: string = "checked",
    onChangeKey: string = "onChange",
    mapOnChange: (value: any) => any = (e) =>
      e.target.checked === true ? e.target.value : undefined
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
    isValid: () => validate()[0],
    radioInputProps,
    reset: () => setData(initial),
  };
}
