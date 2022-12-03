import React from "react";
import { useTranslation } from "react-i18next";
import { Input, Button } from "ui";
import { setTestid } from "utils";

export type CancelationPolicyType = {
  duration: number;
  cost: number;
};

export interface CancelationPolicyInputProps {
  onAdd: (data: CancelationPolicyType) => any;
}

export const CancelationPolicyInput: React.FC<CancelationPolicyInputProps> = ({
  onAdd,
}) => {
  const { t } = useTranslation();
  const [values, setValues] = React.useState<CancelationPolicyType>({
    cost: 0,
    duration: 0,
  });
  return (
    <div className="flex gap-4 flex-col sm:flex-row sm:items-end">
      <div className="flex flex-col gap-1 w-full">
        <p>{t("Policy duration")}</p>
        <Input
          {...setTestid("CancelationPolicyDurationInput")}
          type={"number"}
          min={0}
          placeholder={t("Choose policy duration")}
          onChange={(e) =>
            setValues((values) => ({
              ...values,
              duration: parseInt(e.target.value),
            }))
          }
          value={values.duration}
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <p>{t("Policy cost")}</p>

        <div className="flex w-full items-center gap-2">
          <Input
            {...setTestid("CancelationPolicyCostInput")}
            min={0}
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
        {...setTestid("CancelationPolicyAddBtn")}
        onClick={() => onAdd && onAdd(values)}
      >
        {t("Add")}
      </Button>
    </div>
  );
};
