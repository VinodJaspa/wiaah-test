import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { HtmlInputProps } from "types";
import { Checkbox } from "ui";
import { runIfFn } from "utils";

export interface FilterCheckBoxProps extends HtmlInputProps {
  label?: React.ReactNode;
  currency?: string;
  currencySymbol?: string;
  min?: number;
  max?: number;
  onRangeChange?: (Range: { min: number; max: number }) => void;
  variant?: "radio" | "box" | "range";
}

function convertCurrency(price: number) {
  if (price > 999999) {
    // price is more than a million
    const priceStr = String(price);
    const subStr = priceStr.substring(0, priceStr.length - 6);
    return `${Number(subStr)}M`;
  } else if (price > 999) {
    // price is more than a thousand
    const priceStr = String(price);
    const subStr = priceStr.substring(0, priceStr.length - 3);
    return `${Number(subStr)}K`;
  } else {
    return price;
  }
}

export const FilterInput: React.FC<FilterCheckBoxProps> = ({
  variant,
  label,
  currency = "USD",
  currencySymbol = "$",
  min = 0,
  max = 10000,
  children,
  onRangeChange,
  ...props
}) => {
  const [maxRange, setMaxRange] = React.useState<number>(max);
  const [minRange, setMinRange] = React.useState<number>(min);
  const [trackStyles, setTrackStyles] = React.useState<React.CSSProperties>({});

  function fillColor(minSlideValue: number, maxSlideValue: number) {
    const minPercent = (minSlideValue / max) * 100;
    const maxPercent = (maxSlideValue / max) * 100;
    setTrackStyles((state) => ({
      ...state,
      right: `${100 - maxPercent}%`,
      width: `${maxPercent - minPercent}%`,
    }));
  }

  function handleMinChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMinRange((state) => {
      if (Number(e.target.value) > maxRange || Number(e.target.value) < min)
        return state;
      return Number(e.target.value);
    });
  }

  function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxRange((state) => {
      if (Number(e.target.value) < minRange || Number(e.target.value) > max)
        return state;
      return Number(e.target.value);
    });
  }

  React.useEffect(() => {
    fillColor(Number(minRange), Number(maxRange));
    if (onRangeChange) {
      onRangeChange({ min: minRange, max: maxRange });
    }
  }, [minRange, maxRange]);

  switch (variant) {
    case "radio":
      return (
        <div className="flex w-fit items-center gap-2 ">
          {children && <label htmlFor={props.id}>{children}</label>}
          <input {...props} type="radio" />
          {label && (
            <span data-test="FilterInputLabel">{runIfFn(label, {})}</span>
          )}
        </div>
      );
    case "range":
      return (
        <div className="flex w-full flex-col  gap-2 ">
          <span className="font-bold">{label && runIfFn(label, {})}</span>
          <div className="relative mt-2">
            <span
              style={trackStyles}
              className="pointer-events-none absolute top-0 right-0 h-2 -translate-y-3/4 rounded-full bg-[#57bf9c] "
            ></span>
            <input
              {...props}
              data-test="minRangeInput"
              min={min}
              max={max}
              value={minRange}
              onChange={(e) => handleMinChange(e)}
              className="RangeInput absolute w-full"
              type="range"
            />
            <input
              {...props}
              min={min}
              data-test="maxRangeInput"
              max={max}
              value={maxRange}
              onChange={(e) => handleMaxChange(e)}
              className="RangeInput absolute w-full"
              type="range"
            />
          </div>
          <div className="flex justify-between">
            {/* price indicator */}
            <span>
              {currency} {currencySymbol}
              {convertCurrency(min)}
            </span>
            <span>
              <span className="font-semibold">
                {currencySymbol}
                {convertCurrency(minRange)}
              </span>{" "}
              -{" "}
              <span className="font-semibold">
                {currencySymbol}
                {convertCurrency(maxRange)}
              </span>
            </span>
            <span>
              {currency} {currencySymbol}
              {convertCurrency(max)}
            </span>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex w-fit items-center gap-2 outline-none ">
          <Checkbox {...props} className="focus:ring-0" type="checkbox" />
          {label && (
            <span data-test="FilterInputLabel">{runIfFn(label, {})}</span>
          )}
        </div>
      );
  }
};
