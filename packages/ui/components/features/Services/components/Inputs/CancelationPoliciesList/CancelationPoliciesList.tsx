import React from "react";
import {
  CancelationPolicyType,
  ServiceRefundableTypeDescription,
  CancelationPolicyInput,
  CloseIcon,
} from "ui";

export interface CancelationPoliciesListInputProps {
  value: CancelationPolicyType[];
  onChange: (policies: CancelationPolicyType[]) => any;
}

export const CancelationPoliciesListInput: React.FC<
  CancelationPoliciesListInputProps
> = ({ onChange, value = [] }) => {
  function checkAddable(
    value: CancelationPolicyType,
    values: CancelationPolicyType[]
  ) {
    return (
      values.findIndex(
        (v) => v.cost === value.cost && v.duration === value.duration
      ) < 0
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {Array.isArray(value)
        ? value.map((v, i) => (
            <div className="flex gap-2 items-center">
              <CloseIcon
                className="cursor-pointer"
                onClick={() =>
                  onChange &&
                  onChange(
                    value.filter(
                      (value) =>
                        value.cost !== v.cost && value.duration !== v.duration
                    )
                  )
                }
              />
              <ServiceRefundableTypeDescription
                displayCost
                bookedDate={new Date()}
                {...v}
              />
            </div>
          ))
        : null}
      <CancelationPolicyInput
        onAdd={(policy) => {
          if (checkAddable(policy, value)) {
            onChange && onChange([...value, policy]);
          }
        }}
      />
    </div>
  );
};
