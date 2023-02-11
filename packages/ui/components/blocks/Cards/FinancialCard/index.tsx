import { HtmlDivProps, PriceType } from "types";
import { PriceDisplay } from "@UI";

export interface FinancalCardProps extends HtmlDivProps {
  title: string;
  amount: PriceType;
}

export const FinancialCard: React.FC<FinancalCardProps> = ({
  title,
  amount,
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${
        className || ""
      } text-white bg-primary p-4 flex justify-between gap-4`}
    >
      <div className="flex flex-col gap-4">
        <span>{title}</span>
        <span className="font-bold">
          <PriceDisplay priceObject={amount} />
        </span>
      </div>
      {children}
    </div>
  );
};
