import React from "react";
import { useTranslation } from "react-i18next";
import {
  CountInput,
  CloseIcon,
  AddBadgeButton,
  Input,
  AddBedInput,
  Button,
  PlusIcon,
} from "@UI";

type BedType = {
  name: string;
  amount: number;
  required: boolean;
};

export interface HotelBedsInputProps {
  value?: BedType[];
  onChange?: (beds: BedType[]) => any;
  label?: string;
  errors?: string[];
}

export const HotelBedsInput: React.FC<HotelBedsInputProps> = ({
  onChange = () => {},
  value = [],
}) => {
  const [add, setAdd] = React.useState<boolean>(false);
const { t }: { t: (key: string, ...args: any[]) => string } = useTranslation();
  const beds = Array.isArray(value)
    ? value.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0)
    : 0;

  return (
    <div className="w-full flex flex-col gap-4">
      {Array.isArray(value)
        ? value.map((v, idx) => (
            <div className="flex text-xl items-center justify-between">
              <div className="flex items-center gap-2">
                {v.required ? null : (
                  <CloseIcon
                    className="text-xs"
                    onClick={() =>
                      onChange && onChange(value.filter((_, i) => i !== idx))
                    }
                  />
                )}
                <p className="text-sm font-semibold">{t(v.name)}</p>
              </div>
              <CountInput
                count={v.amount}
                onCountChange={(count) => {
                  if (value[idx] && value[idx].amount !== count) {
                    const newValue = [...value];
                    newValue.splice(idx, 1, { ...v, amount: count });
                    // onChange && onChange(newValue);
                  }
                }}
              />
            </div>
          ))
        : null}

      {add ? (
        <AddBedInput
          onAdd={(data) => {
            onChange &&
              onChange([
                ...value,
                { name: data.name, amount: 0, required: false },
              ]);
            setAdd(false);
          }}
        />
      ) : (
        <Button
          className="gap-2 justify-center w-full flex items-center"
          onClick={() => setAdd(true)}
        >
          <PlusIcon />
          <p>{t("Add another bed")}</p>
        </Button>
      )}
    </div>
  );
};
