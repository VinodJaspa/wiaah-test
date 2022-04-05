import { t } from "i18next";
import React from "react";
import { ShippingMothed } from "types/market/Checkout";
import { BoxShadow, Padding, FilterInput, Spacer } from "ui";
export interface ShippingMothedsProps {
  motheds: ShippingMothed[];
  onSelection?: (mothedId: string) => void;
}

export const ShippingMotheds: React.FC<ShippingMothedsProps> = ({
  motheds,
  onSelection,
}) => {
  const [shippingMothedId, setShippingMothedId] = React.useState<string>();
  React.useEffect(() => {
    if (onSelection && shippingMothedId) {
      onSelection(shippingMothedId);
    }
  }, [shippingMothedId]);
  return (
    <div className="bg-white">
      <BoxShadow>
        <Padding Y={{ value: 2 }} X={{ value: 2 }}>
          <div className="flex flex-col gap-8">
            <span id="ShippingMothedTitle" className="px-2 text-3xl font-bold">
              {t("shipping_mothed", "Shipping Mothed")}
            </span>
            <table className="w-full">
              <tbody id="ShippingMothedsContainer" className="w-1/4 text-2xl">
                {motheds.map((mothed, i) => (
                  <tr
                    key={mothed.id}
                    data-testMothedId={mothed.id}
                    data-testId="ShippingMothed"
                    className="cursor-pointer"
                    onClick={() => setShippingMothedId(mothed.id)}
                  >
                    <td className="px-2 align-top">
                      <span
                        data-testId="ShippingMothedCost"
                        className="font-bold"
                      >
                        {mothed.cost > 0 ? `$${mothed.cost}` : "FREE"}
                      </span>
                    </td>
                    <td className="flex w-[45rem] flex-col gap-4 px-4 font-semibold">
                      <div
                        data-testId="ShippingMothedName"
                        className="whitespace-nowrap"
                      >
                        {mothed.name}
                      </div>

                      {mothed.description && (
                        <div
                          data-testId="ShippingMothedDescription"
                          className="text-lg font-normal"
                        >
                          {mothed.description}
                        </div>
                      )}
                    </td>
                    <td className="">
                      <FilterInput
                        data-testId="ShippingMothedInput"
                        className="scale-150 text-black ring-0 focus:ring-0"
                        value={mothed.id}
                        onChange={(e) => setShippingMothedId(e.target.value)}
                        checked={shippingMothedId === mothed.id}
                        variant="radio"
                        name="shippingMothed"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Padding>
      </BoxShadow>
    </div>
  );
};
