import React from "react";
import { FaTrash } from "react-icons/fa";
import { IoCalendar, IoHome, IoLocation } from "react-icons/io5";
import {
  Clickable,
  FlexStack,
  SelectDropdown,
  Spacer,
} from "ui/components/partials";
import { CartSummaryItem } from "types/market/CartSummary";
import { IoMdClock } from "react-icons/io";
import { getTimeInAmPm } from "ui/components/helpers";
import { t } from "i18next";

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
    console.log(timeZone);
    return `${getTimeInAmPm(new Date(date), timeZone)} - ${getTimeInAmPm(
      new Date(toTimestamp),
      timeZone
    )}`;
  }

  return (
    <table className="w-full">
      <thead className="h-12 border-[1px] border-gray-400 border-opacity-30 bg-gray-200">
        <tr className="-bold">
          {headers.map((header, i) => (
            <td className={`px-4 text-center first:w-full first:text-left`}>
              {t(header, header.replace("_", " ").toUpperCase())}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {items.map((item, i) => (
          <>
            <Spacer />
            <tr style={{ verticalAlign: "top" }} className="bg-white" key={i}>
              <td className="flex gap-4">
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
                        <SelectDropdown
                          fullWidth={true}
                          name="Size"
                          options={item.sizes.map((item) => ({
                            name: item.size,
                            value: item.size,
                          }))}
                        />
                      </div>
                    )}
                    {item.colors && (
                      <div className="w-20">
                        {/* colors select */}
                        <SelectDropdown
                          fullWidth={true}
                          name="Color"
                          options={item.colors.map((color) => ({
                            name: color.name,
                            value: color.hexCode,
                          }))}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td>
                {item.type === "product" ? (
                  <>
                    <SelectDropdown
                      name={t(
                        "choose_shipping_mothed",
                        "Choose your Shipping mothed"
                      )}
                      options={
                        item.shippingMotheds
                          ? item.shippingMotheds.map((mothed) => ({
                              name: mothed.name,
                              value: mothed.value,
                            }))
                          : []
                      }
                      onSelection={(_, i) => setCurrentMothed(i)}
                    />
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
                  <SelectDropdown
                    onSelection={(value) =>
                      handleItemQtyChange(Number(value), item.id)
                    }
                    initialValue={String(item.qty)}
                    fullWidth={true}
                    options={[...Array(50)].map((_, i) => ({
                      name: String(i + 1),
                      value: String(i + 1),
                    }))}
                  />
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
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
