import { HtmlDivProps, PriceType } from "types";
import { PriceDisplay } from "ui";

export interface FinancalCardProps extends HtmlDivProps {
  title: string;
  amount: PriceType;
}

export const FinancialCard: React.FC<FinancalCardProps> = ({
  title,
  amount,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${
        className || ""
      } text-white bg-primary p-4 flex flex-col gap-4`}
    >
      <span>{title}</span>
      <span className="font-bold">
        <PriceDisplay priceObject={amount} />
      </span>
    </div>
  );
};
