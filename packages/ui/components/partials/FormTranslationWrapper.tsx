import React from "react";

const FormTranslationContext = React.createContext<{
  lang: string;
  setLang: (lang: string) => any;
}>({
  lang: "en",
  setLang() {},
});

export function getTranslationStateValue<TValue extends Record<string, any>>(
  values: TValue,
  key: keyof TValue,
  lang: string
) {
  return values?.[key]?.[lang] || "";
}

export function setTranslationStateValue<TValue, TKey extends keyof TValue>(
  values: TValue,
  key: TKey,
  value: any,
  lang: string
): TValue[TKey] {
  return {
    ...(values?.[key] || ({} as TValue[TKey])),
    [lang]: value,
  };
}

export const useFormTranslationWrapper = () => {
  const { lang, setLang } = React.useContext(FormTranslationContext);

  return {
    lang,
    changeLang: (lang: string) => setLang(lang),
  };
};

export const FormTranslationWrapper: React.FC<{
  lang: string;
  onLangChange: (lang: string) => any;
}> = ({ lang, onLangChange, children }) => {
  return (
    <FormTranslationContext.Provider value={{ lang, setLang: onLangChange }}>
      {children}
    </FormTranslationContext.Provider>
  );
};
