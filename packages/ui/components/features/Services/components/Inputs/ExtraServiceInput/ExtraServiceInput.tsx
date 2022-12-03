import React from "react";
import { useTranslation } from "react-i18next";
import { Input, Button } from "ui";
import { setTestid } from "utils";

export type ExtraServiceData = {
  name: string;
  cost: number;
};

export interface ExtraServiceInputProps {
  onAdd: (data: ExtraServiceData) => any;
}

export const ExtraServiceInput: React.FC<ExtraServiceInputProps> = ({
  onAdd,
}) => {
  const { t } = useTranslation();
  const [values, setValues] = React.useState<ExtraServiceData>({
    cost: 0,
    name: "",
  });
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
      <div className="flex flex-col gap-1 w-full">
        <p>{t("Extra name")}</p>
        <Input
          {...setTestid("ExtraServiceNameInput")}
          type={"text"}
          placeholder={t("Extra name")}
          onChange={(e) =>
            setValues((values) => ({
              ...values,
              name: e.target.value,
            }))
          }
          value={values.name}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <p>{t("Extra cost")}</p>
        <div className="flex w-full items-center gap-2">
          <Input
            min={0}
            {...setTestid("ExtraServiceCostInput")}
            type={"number"}
            placeholder={t("Choose policy cost")}
            onChange={(e) =>
              setValues((values) => ({
                ...values,
                cost: parseInt(e.target.value),
              }))
            }
            value={values.cost}
          />
          <p className="text-xl">$</p>
        </div>
      </div>
      <Button
        {...setTestid("ExtraAddBtn")}
        onClick={() => onAdd && onAdd(values)}
      >
        {t("Add")}
      </Button>
    </div>
  );
};
