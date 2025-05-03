import React from "react";
import { FaTrash } from "react-icons/fa";
import { IoCalendar, IoHome, IoLocation } from "react-icons/io5";
import {
  Clickable,
  FlexStack,
  Select,
  SelectOption,
  Table,
  Tr,
  Td,
  Th,
  TBody,
  THead,
  Spacer,
  SelectProps,
  FormikInput,
} from "@UI";
import { CartSummaryItem } from "types";
import { IoMdClock } from "react-icons/io";
import { getTimeInAmPm } from "@UI/components/helpers";
import { useTranslation } from "react-i18next";

export interface CartSummaryTableProps {
  items: CartSummaryItem[];
  onQtyChange?: (id: string, qty: number) => void;
  onItemDelete?: (id: string) => void;
}

export const CartSummaryTable: React.FC<CartSummaryTableProps> = ({
  items,
  onQtyChange,
  onItemDelete,
}) => {
  const headers = ["item", "shopping_mothed", "qty", "price", "action"];
  const [currentMothed, setCurrentMothed] = React.useState<number>();

  function handleSendToMap(item: CartSummaryItem) {}

  function handleDateClick() {}

  function handleTimeClick() {}

  function handleItemQtyChange(qty: number, id: string) {
    if (onQtyChange) onQtyChange(id, qty);
  }
  function handleItemDeletion(id: string) {
    if (onItemDelete) {
      onItemDelete(id);
    }
  }

  function getDate(date: number) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateString = new Date(date).toLocaleDateString("Default", {
      timeZone,
      month: "long",
      weekday: "long",
      day: "numeric",
      year: "numeric",
    });
    return dateString;
  }

  function getTime(date: number, eventDurationInMinutes: number) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const toTimestamp = date + eventDurationInMinutes * 60 * 1000;
    return `${getTimeInAmPm(new Date(date), timeZone)} - ${getTimeInAmPm(
      new Date(toTimestamp),
      timeZone
    )}`;
  }
const { t } = useTranslation();
  return (
    <Table className="w-full">
      <THead>
        <Tr>
          {headers.map((header, i) => (
            <Th>{t(header, header.replace("_", " ").toUpperCase())}</Th>
          ))}
        </Tr>
      </THead>
      <TBody>
        {items.map((item, i) => (
          <>
            <Spacer />
            <Tr>
              <Td className="flex gap-4">
                <img
                  className="h-36 w-28 object-cover"
                  src={item.imageUrl}
                  alt={item.name}
                />
                <div className="flex flex-col justify-between font-bold">
                  <div>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex gap-4">
                    {item.sizes && (
                      <div className="w-20">
                        {/* size select */}
                        <Select
                        // name="size"
                        >
                          {item.sizes.map((item, i) => (
                            <SelectOption key={item + i} value={item}>
                              {item}
                            </SelectOption>
                          ))}
                        </Select>
                      </div>
                    )}
                    {item.colors && (
                      <div className="w-20">
                        {/* colors select */}
                        <Select
                        // name="color"
                        >
                          {item.colors.map((color, i) => (
                            <SelectOption key={color + i} value={color}>
                              {color}
                            </SelectOption>
                          ))}
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </Td>
              <td>
                {item.type === "product" ? (
                  <>
                    <Select
                      // name={"shippingMethod"}
                      onOptionSelect={(v) =>
                        setCurrentMothed(
                          item.shippingMotheds?.findIndex((m) => m.value === v)
                        )
                      }
                    >
                      {item.shippingMotheds ? (
                        item.shippingMotheds.map((method, i) => (
                          <SelectOption key={i} value={method.value}>
                            {method.name}
                          </SelectOption>
                        ))
                      ) : (
                        <></>
                      )}
                    </Select>
                    <Spacer spaceInRem={0.5} />
                    {item.shippingMotheds && currentMothed !== undefined && (
                      <span>
                        Devlivery Time{" "}
                        {item.shippingMotheds[currentMothed].deliveryTime.from}-
                        {item.shippingMotheds[currentMothed].deliveryTime.to}{" "}
                        days
                      </span>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col gap-1 text-xl">
                    {item.date && item.eventDuration && (
                      <>
                        <Clickable onClick={handleDateClick}>
                          <FlexStack horizontalSpacingInRem={0.5}>
                            {/* date */}
                            <IoCalendar />
                            <span className="text-sm">
                              {getDate(item.date)}
                            </span>
                          </FlexStack>
                        </Clickable>
                        <Clickable onClick={handleTimeClick}>
                          <FlexStack horizontalSpacingInRem={0.5}>
                            {/* time */}
                            <IoMdClock />
                            <span className="text-sm">
                              {getTime(item.date, item.eventDuration)}
                            </span>
                          </FlexStack>
                        </Clickable>
                      </>
                    )}
                    {item.eventAdresses && (
                      <Clickable>
                        <FlexStack horizontalSpacingInRem={0.5}>
                          {/* address */}
                          <IoHome />
                          <span className="text-sm">{item.eventAdresses}</span>
                        </FlexStack>
                      </Clickable>
                    )}
                    {item.location && (
                      <Clickable onClick={() => handleSendToMap(item)}>
                        <FlexStack horizontalSpacingInRem={0.5}>
                          <IoLocation />
                          <span className="text-sm">{item.location}</span>
                        </FlexStack>
                      </Clickable>
                    )}
                  </div>
                )}
              </td>
              <td align="center">
                <div className="mx-2 w-14 rounded-md">
                  <Select
                    onOptionSelect={(value) =>
                      handleItemQtyChange(Number(value), item.id)
                    }
                  >
                    {[...Array(50)].map((_, i) => (
                      <SelectOption value={i + 1}>{i + 1}</SelectOption>
                    ))}
                  </Select>
                </div>
              </td>
              <td align="center">${item.price}</td>
              <td align="center">
                <div
                  onClick={() => handleItemDeletion(item.id)}
                  className="flex h-11 w-12 cursor-pointer items-center justify-center rounded-md bg-red-700"
                >
                  <FaTrash className="text-2xl text-white " />
                </div>
              </td>
            </Tr>
          </>
        ))}
      </TBody>
    </Table>
  );
};
