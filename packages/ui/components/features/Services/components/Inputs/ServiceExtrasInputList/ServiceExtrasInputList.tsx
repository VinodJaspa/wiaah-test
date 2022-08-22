import React from "react";
import { useTranslation } from "react-i18next";
import {
  ExtraServiceData,
  PriceDisplay,
  ExtraServiceInput,
  CloseIcon,
} from "ui";

export interface ServiceExtrasInputListProps {
  onChange: (list: ExtraServiceData[]) => any;
  value: ExtraServiceData[];
}

export const ServiceExtrasInputList: React.FC<ServiceExtrasInputListProps> = ({
  onChange,
  value = [],
}) => {
  const { t } = useTranslation();
  function checkAddable(value: ExtraServiceData, values: ExtraServiceData[]) {
    return (
      values.findIndex((v) => v.cost === value.cost && v.name === value.name) <
      0
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {Array.isArray(value)
        ? value.map((v, i) => (
            <div className="flex items-center gap-2">
              <CloseIcon
                className="cursor-pointer"
                onClick={() =>
                  onChange &&
                  onChange(
                    value.filter(
                      (value) => value.cost !== v.cost && value.name !== v.name
                    )
                  )
                }
              />

              <div className="flex w-full items-center justify-between">
                <p>{v.name}</p>
                <PriceDisplay price={v.cost} />
              </div>
            </div>
          ))
        : null}
      <ExtraServiceInput
        onAdd={(extra) =>
          checkAddable(extra, value)
            ? onChange && onChange([...value, extra])
            : null
        }
      />
    </div>
  );
};
