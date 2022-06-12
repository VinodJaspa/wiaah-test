import React from "react";
import { HtmlInputProps, TranslationTextType } from "types";
import { TranslationText, Radio, HStack, Input } from "ui";

export type ChooseOptionInputOptType = {
  title: TranslationTextType;
  input: HtmlInputProps | null | undefined | false;
  key: string;
};

export interface ChooseWithInputProps {
  title: TranslationTextType;
  options: ChooseOptionInputOptType[];
  name: string;
  onOptionChange?: (optionKey: string) => any;
  onOptionValueChange?: (value: string) => any;
}

export const ChooseWithInput: React.FC<ChooseWithInputProps> = ({
  title,
  options,
  name,
  onOptionChange,
  onOptionValueChange,
}) => {
  const [opt, setOpt] = React.useState<string>("");
  React.useEffect(() => {
    onOptionChange && onOptionChange(opt);
  }, [opt]);
  return (
    <div className="flex gap-2">
      <TranslationText translationObject={title} />:
      <div className="flex flex-col gap-2">
        {options.map(({ key, title, input }, i) => (
          <HStack key={i}>
            <TranslationText translationObject={title} />
            <Radio name={name} onChange={(e) => setOpt(key)} />
            {opt === key && input ? (
              <>
                <Input defaultChecked={i === 0} {...input} />
              </>
            ) : null}
          </HStack>
        ))}
      </div>
    </div>
  );
};
