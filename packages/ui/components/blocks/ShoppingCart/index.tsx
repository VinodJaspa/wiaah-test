import React from "react";
import { MdDeleteOutline, MdClose } from "react-icons/md";
import { ShoppingCartOutlineIcon, useOutsideClick } from "@UI";
import { ArrElement } from "types";
import { useCartSummary, Badge } from "@UI";
import { useShoppingCart, useGetMyShoppingCartQuery, PriceDisplay } from "@UI";
import { useTranslation } from "react-i18next";
import { useRouting } from "routing";

export interface ShoppingCartProps {}

export const ShoppingCart: React.FC<ShoppingCartProps> = () => {
  const cartRef = React.useRef<HTMLDivElement>(null);
  const [total, setTotal] = React.useState<number>(0);
  const { data: res, isLoading, isError } = useGetMyShoppingCartQuery();
  const { visit } = useRouting();
  const items = res ? res.data : [];
  const { ShoppingCartOpen, OpenShoppingCart, closeShoppingCart } =
    useShoppingCart();

  const { t } = useTranslation();

  const DropdownStyles: React.CSSProperties = {};
  const { RemoveItem } = useCartSummary();

  useOutsideClick(cartRef, () => {
    handleClose();
  });

  React.useEffect(() => {
    const total = items.reduce((acc, item) => {
      const totalItemCost =
        item.data.price * (item.type === "product" ? item.data.qty : 1);
      return acc + totalItemCost;
    }, 0);
    setTotal(total);
  }, [items]);

  if (ShoppingCartOpen) {
    DropdownStyles.opacity = "100%";
    DropdownStyles.pointerEvents = "all";
    DropdownStyles.transform = "translateY(1rem)";
  } else {
    DropdownStyles.pointerEvents = "none";
    DropdownStyles.opacity = "0%";
    DropdownStyles.transform = "translateY(0rem)";
  }

  function handleDeleteitem(item: ArrElement<typeof items>) {
    RemoveItem(item.data.id || "");
  }

  function handleOpen() {
    OpenShoppingCart();
  }

  function handleClose() {
    closeShoppingCart();
  }

  function handleToggleOpen() {
    if (!ShoppingCartOpen) return handleOpen();
    handleClose();
  }

  return (
    <div className="relative" ref={cartRef}>
      <div
        onClick={() => handleToggleOpen()}
        className="relative cursor-pointer select-none"
      >
        <ShoppingCartOutlineIcon className="text-icon text-white h-6 w-6" />
        <div className="w-4 h-4 absolute bottom-0 right-0 border-2 border-white translate-x-1/3 translate-y-1/3 flex items-center justify-center rounded-full bg-red-500 text-[0.5rem] text-white">
          {items.length}
        </div>
      </div>
      {/* cart dropdown */}
      <div
        style={DropdownStyles}
        className="absolute top-full -right-[150%] z-50 w-80 text-black  transition-all"
      >
        <div className="mr-[3.25rem] flex justify-end">
          <div
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
            className="h-4 w-8 bg-gray-200 translate-y-0.5"
          ></div>
        </div>

        <div className="flex flex-col gap-2 bg-gray-200 py-2 ">
          <div className="flex justify-between px-4 font-bold">
            <span>
              {t("My Cart")}, {items.length} {t("items")}
            </span>
            <span
              onClick={() => handleClose()}
              className="flex cursor-pointer items-center justify-center"
            >
              <MdClose />
            </span>
          </div>
          <div className="flex max-h-64 flex-col gap-2 thinScroll overflow-y-scroll">
            {items.map((item, i) => {
              const { data, type } = item;
              return (
                <div
                  key={i}
                  className="mr-4 ml-0.5 flex gap-4 rounded bg-gray-100 py-2 px-4 shadow-md"
                >
                  <div className="h-24 w-24 rounded">
                    <img
                      className="h-full w-full object-cover"
                      src={data.thumbnail}
                    />
                  </div>
                  <div className="flex flex-grow flex-col justify-between">
                    <div className="flex w-full flex-col">
                      <PriceDisplay price={data.price} />
                      <div className="">{data.name}</div>
                      {type === "product" ? (
                        <div className="">Qty: {data.qty}</div>
                      ) : null}
                    </div>
                    <div
                      onClick={() => handleDeleteitem(item)}
                      className="cursor-bold flex w-full cursor-pointer justify-between text-lg"
                    >
                      <div className="text-xs">
                        {type === "service" ? (
                          <Badge variant="success">
                            {item.data.serviceType}
                          </Badge>
                        ) : null}
                      </div>
                      {/* <FaTrash /> */}
                      <MdDeleteOutline />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="my-2 flex w-full justify-between border-y-2 border-gray-400 border-opacity-25 px-4 py-2">
            {/* total */}
            <span>{t("Sub-total")}</span>
            <PriceDisplay price={total} />
          </div>
          <div className="flex gap-2 px-4">
            {/* buttons */}
            <button
              onClick={() => visit((routes) => routes.visitCartSummary())}
              className="w-full bg-gray-100 py-2"
            >
              {t("View Cart")}
            </button>
            <button
              onClick={() => visit((routes) => routes.visitCheckout())}
              className="w-full bg-[#57bf9c] py-2 text-white "
            >
              {t("Checkout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
