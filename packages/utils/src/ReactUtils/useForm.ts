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
    onChange?: (data: TForm) => any;
  }
) {
  const [data, setData] = React.useState<TForm>(initial);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [haveSetInitial, setHaveSetInitial] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const schema = options?.yupSchema;

  function validate(currentData = data): [boolean, Record<string, string>] {
    try {
      if (schema) {
        schema.validateSync(currentData, { abortEarly: false });
      }
      return [true, {} as ValidationFormErrors<TForm>];
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce((acc, curr) => {
          if (curr instanceof yup.ValidationError && curr.path) {
            return { ...acc, [curr.path]: curr.message };
          }
          return acc;
        }, {}) as ValidationFormErrors<TForm>;

        return [false, errors];
      } else {
        return [false, { unknown: "Unknown error" } as ValidationFormErrors<TForm>];
      }
    }
  }

  function triggerValidation() {
    setHasSubmitted(true);
    const [valid, errs] = validate();
    setErrors(errs);
    return valid;
  }

  function handleChange<Tkey extends keyof TForm, Tvalue extends TForm[Tkey]>(
    key: Tkey,
    v: Tvalue
  ) {
    setData((old) => {
      const newV = { ...old, [key]: v, ...constents };
      if (options?.onChange) options.onChange(newV);
      return newV;
    });

    // Only re-validate if user already submitted
    if (hasSubmitted && schema) {
      const [_, errs] = validate({ ...data, [key]: v });
      setErrors(errs);
    }
  }

  function inputProps<Tkey extends keyof TForm>(
    key: Tkey,
    valueKey = "value",
    onChangeKey = "onChange",
    mapOnChange: (value: any) => any = (e) => e.target.value
  ) {
    return {
      [valueKey]: data[key] as TForm[Tkey],
      [onChangeKey]: (e: any) => handleChange(key, mapOnChange(e)),
      label: options?.addLabel ? startCase(String(key)) : undefined,
      placeholder: options?.addPlaceholder ? startCase(String(key)) : undefined,
      errormessage: hasSubmitted ? errors[key as string] : undefined,
    };
  }

  function dateInputProps<Tkey extends keyof TForm>(
    key: Tkey,
    valueKey = "dateValue",
    onChangeKey = "onDateChange",
    mapOnChange: (value: any) => any = (e) => e
  ) {
    return {
      [valueKey]: data[key] as TForm[Tkey],
      [onChangeKey]: (e: any) => handleChange(key, mapOnChange(e)),
      label: options?.addLabel ? startCase(String(key)) : undefined,
      errormessage: hasSubmitted ? errors[key as string] : undefined,
    };
  }

  // Add similar hasSubmitted checks to other props functions...

  function setInitialData(d: TForm) {
    if (!haveSetInitial) {
      setData({ ...d, ...constents });
      setHaveSetInitial(true);
    }
  }

  return {
    form: data,
    formErrors: errors,
    handleChange,
    inputProps,
    dateInputProps,
    isValid: () => validate()[0],
    setValue: (v: TForm) => setData({ ...v, ...constents }),
    reset: () => setData(initial),
    setInitialData,
    triggerValidation, // <--- Call this from submit or "Next"
  };
}
