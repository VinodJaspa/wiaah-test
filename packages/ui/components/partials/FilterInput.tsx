import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface FilterCheckBoxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  currency?: string;
  currencySymbol?: string;
  min: number;
  max: number;
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
  onRangeChange,
  ...props
}) => {
  const [maxRange, setMaxRange] = React.useState<number>(max / 2);
  const [minRange, setMinRange] = React.useState<number>(max / 4);
  const [trackStyles, setTrackStyles] = React.useState<React.CSSProperties>({});

  function fillColor(minSlideValue: number, maxSlideValue: number) {
    const minPercent = (minSlideValue / max) * 100;
    const maxPercent = (maxSlideValue / max) * 100;
    console.log(100 - maxPercent);
    setTrackStyles((state) => ({
      ...state,
      right: `${100 - maxPercent}%`,
      width: `${maxPercent - minPercent}%`,
      // transform: `translate`
    }));
  }

  function handleMinChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMinRange((state) => {
      if (Number(e.target.value) > maxRange) return state;
      return Number(e.target.value);
    });
    // fillColor(Number(minRange), Number(maxRange));
  }
  function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxRange((state) => {
      if (Number(e.target.value) < minRange) return state;
      return Number(e.target.value);
    });
    // fillColor(Number(minRange), Number(maxRange));
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
        <div className="flex w-full items-center gap-2">
          <input {...props} type="radio" />
          <span>{label}</span>
        </div>
      );
    case "range":
      return (
        <div className="flex w-full flex-col  gap-2">
          <span className="font-bold">{label}</span>
          <div className="relative mt-2">
            <span
              style={trackStyles}
              className="pointer-events-none absolute top-0 right-0 h-2  -translate-y-3/4 bg-[#57bf9c] "
            ></span>
            <input
              {...props}
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
        <div className="flex w-full items-center gap-2">
          <input {...props} type="checkbox" />
          <div>{label}</div>
        </div>
      );
  }
};
