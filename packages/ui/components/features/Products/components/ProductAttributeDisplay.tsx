import { mapArray } from "@UI/../utils/src";
import {
  ProductAttribute,
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
} from "@features/API";
import { Checkbox, Radio } from "@partials";
import React from "react";

export const ProductAttributeDisplay: React.FC<
  ProductAttribute & {
    onChange: (value: string[]) => any;
    value: string[];
  }
> = ({ displayType, name, selectionType, values, onChange, value: _value }) => {
  return (
    <>
      {mapArray(values, (value) => {
        const valueDispaly =
          displayType === ProductAttributeDisplayType.Color ? (
            <button
              className="w-8 h-8 rounded-xl"
              style={{ backgroundColor: value.value }}
            />
          ) : (
            <p>{value.value}</p>
          );
        return selectionType === ProductAttributeSelectionType.Single ? (
          <Radio
            checked={_value.includes(value.value)}
            onChange={(e) =>
              e.target.checked ? onChange && onChange([value.value]) : null
            }
            name={name}
          >
            {valueDispaly}
          </Radio>
        ) : (
          <Checkbox
            onChange={(e) =>
              e.target.checked
                ? onChange &&
                  onChange(
                    _value
                      .filter((v) => v !== value.value)
                      .concat([value.value])
                  )
                : null
            }
            checked={_value.includes(value.value)}
          >
            {valueDispaly}
          </Checkbox>
        );
      })}
    </>
  );
};
