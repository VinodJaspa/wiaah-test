import { t } from "i18next";
import React from "react";
import { ShippingMothed } from "types/market/Checkout";
import { BoxShadow, Padding, FilterInput, Spacer } from "ui";
export interface ShippingMothedsProps {
  motheds: ShippingMothed[];
}

export const ShippingMotheds: React.FC<ShippingMothedsProps> = ({
  motheds,
}) => {
  const [shippingMothedValue, setShippingMothedValue] =
    React.useState<string>();
  return (
    <div className="bg-white">
      <BoxShadow>
        <Padding Y={{ value: 2 }} X={{ value: 2 }}>
          <div className="flex flex-col gap-8">
            <span className="px-2 text-3xl font-bold">
              {t("shipping_mothed", "Shipping Mothed")}
            </span>
            <table className="w-full">
              <tbody className="w-1/4 text-2xl">
                {motheds.map((mothed, i) => (
                  <>
                    <tr
                      className="cursor-pointer"
                      onClick={() => setShippingMothedValue(mothed.id)}
                    >
                      <td className="px-2 align-top">
                        <span className="font-bold">
                          {mothed.cost > 0 ? `$${mothed.cost}` : "FREE"}
                        </span>
                      </td>
                      <td className="flex w-[45rem] flex-col gap-4 px-4 font-semibold">
                        <div className="whitespace-nowrap">{mothed.name}</div>

                        {mothed.description && (
                          <div className="text-lg font-normal">
                            {mothed.description}
                          </div>
                        )}
                      </td>
                      <td className="">
                        <FilterInput
                          className="scale-150 text-black ring-0 focus:ring-0"
                          value={mothed.id}
                          onChange={(e) =>
                            setShippingMothedValue(e.target.value)
                          }
                          checked={shippingMothedValue === mothed.id}
                          variant="radio"
                          name="shippingMothed"
                        />
                      </td>
                    </tr>
                    {i + 1 < motheds.length && <Spacer spaceInRem={4} />}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </Padding>
      </BoxShadow>
    </div>
  );
};
