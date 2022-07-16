import { Table, Tbody, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { ShippingMothed } from "types";
import { BoxShadow, Padding, FilterInput, Spacer } from "ui";
export interface ShippingMothedsProps {
  motheds: ShippingMothed[];
  onSelection?: (mothedId: string) => void;
}

export const ShippingMotheds: React.FC<ShippingMothedsProps> = ({
  motheds,
  onSelection,
}) => {
  const { t } = useTranslation();
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
            <Table className="w-full">
              <Tbody id="ShippingMothedsContainer" className="w-1/4 text-2xl">
                {motheds.map((mothed, i) => (
                  <Tr
                    key={mothed.id}
                    data-testMothedId={mothed.id}
                    data-testId="ShippingMothed"
                    className="cursor-pointer py-4"
                    onClick={() => setShippingMothedId(mothed.id)}
                  >
                    <Td paddingX={"0.5rem"} className="px-2 align-top">
                      <span
                        data-testId="ShippingMothedCost"
                        className="font-bold"
                      >
                        {mothed.cost > 0 ? `$${mothed.cost}` : "FREE"}
                      </span>
                    </Td>
                    <Td className="flex w-[45rem] flex-col gap-4 px-4 font-semibold">
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
                    </Td>
                    <Td className="">
                      <FilterInput
                        data-testId="ShippingMothedInput"
                        className="scale-150 text-black ring-0 focus:ring-0"
                        value={mothed.id}
                        onChange={(e) => setShippingMothedId(e.target.value)}
                        checked={shippingMothedId === mothed.id}
                        variant="radio"
                        name="shippingMothed"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </Padding>
      </BoxShadow>
    </div>
  );
};
