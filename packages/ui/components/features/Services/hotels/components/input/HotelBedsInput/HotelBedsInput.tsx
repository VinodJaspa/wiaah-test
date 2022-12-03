import React from "react";
import { useTranslation } from "react-i18next";
import { CountInput, CloseIcon, AddBadgeButton, Input, AddBedInput } from "ui";

type BedType = {
  name: string;
  amount: number;
  required: boolean;
};

export interface HotelBedsInputProps {
  value: BedType[];
  onChange: (beds: BedType[]) => any;
}

export const HotelBedsInput: React.FC<HotelBedsInputProps> = ({
  onChange,
  value = [],
}) => {
  const [add, setAdd] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const beds = Array.isArray(value)
    ? value.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0)
    : 0;

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-gray-400 font-semibold">
        {beds} {beds > 1 ? t("beds") : t("bed")}
      </p>
      {Array.isArray(value)
        ? value.map((v, idx) => (
            <div className="flex text-xl items-center justify-between">
              <div className="flex items-center gap-2">
                {v.required ? null : (
                  <CloseIcon
                    onClick={() =>
                      onChange && onChange(value.filter((_, i) => i !== idx))
                    }
                  />
                )}
                <p className="font-semibold">{t(v.name)}</p>
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
          onAdd={(data) =>
            onChange &&
            onChange([
              ...value,
              { name: data.name, amount: 0, required: false },
            ])
          }
        />
      ) : (
        <AddBadgeButton onClick={() => setAdd(true)}>
          {t("Add another bed")}
        </AddBadgeButton>
      )}
    </div>
  );
};
