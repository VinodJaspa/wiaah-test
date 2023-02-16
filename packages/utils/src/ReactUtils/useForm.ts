import React from "react";

export function useForm<TForm>(initial: TForm, constents?: TForm) {
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
    return {
      [valueKey]: data[key] as TForm[Tkey],
      [onChangeKey]: (e: any) => handleChange(key, mapOnChange(e)),
    };
  }

  return { form: data, handleChange, inputProps };
}
