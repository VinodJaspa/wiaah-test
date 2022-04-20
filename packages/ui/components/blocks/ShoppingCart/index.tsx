import React from "react";
import { FaShoppingBag, FaTrash } from "react-icons/fa";
import { MdDeleteOutline, MdClose } from "react-icons/md";
import { useOutsideClick } from "ui/Hooks/useOutsideClick";
import { ShoppingCartItem } from "ui/types/shoppingCart/shoppingCartItem.interface";
import { useCartSummary } from "ui/Hooks";
import { useShoppingCart } from "ui/Hooks/";

export interface ShoppingCartProps {
  items: ShoppingCartItem[];
  onItemDelete?: (item: ShoppingCartItem) => void;
  ref?: any;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onItemDelete,
}) => {
  const cartRef = React.useRef<HTMLDivElement>(null);
  const [total, setTotal] = React.useState<number>(0);
  const { ShoppingCartOpen, OpenShoppingCart, closeShoppingCart } =
    useShoppingCart();

  const DropdownStyles: React.CSSProperties = {};
  const { RemoveItem } = useCartSummary();

  useOutsideClick(cartRef, () => {
    handleClose();
  });

  React.useEffect(() => {
    const total = items.reduce((acc, item) => {
      const totalItemCost = item.price * item.quantity;
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

  function handleDeleteitem(item: ShoppingCartItem) {
    RemoveItem(item.id);
    if (onItemDelete) {
      onItemDelete(item);
    }
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
        <FaShoppingBag className="h-8 w-8" />
        <div className="absolute -bottom-2 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
          {items.length}
        </div>
      </div>
      {/* cart dropdown */}
      <div
        style={DropdownStyles}
        className="absolute top-full -right-[150%] z-50 w-80 text-black  transition-all"
      >
        <div className="mr-8 flex justify-end">
          <div
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
            className="h-4 w-8 bg-gray-200 "
          ></div>
        </div>

        <div className="flex flex-col gap-2 bg-gray-200 py-2 ">
          <div className="flex justify-between px-4 font-bold">
            <span>My Cart, {items.length} items</span>
            <span
              onClick={() => handleClose()}
              className="flex cursor-pointer items-center justify-center"
            >
              <MdClose />
            </span>
          </div>
          <div className="no-scroll flex max-h-64 flex-col gap-2 overflow-y-scroll">
            {items.map((item, i) => (
              <div
                key={i}
                className="mr-4 ml-0.5 flex gap-4 rounded bg-gray-100 py-2 px-4 shadow-md"
              >
                <div className="h-24 w-24 rounded">
                  <img
                    className="h-full w-full object-cover"
                    src={item.thumbnail}
                  />
                </div>
                <div className="flex flex-grow flex-col justify-between">
                  <div className="flex w-full flex-col">
                    <div className="font-bold">${item.price}</div>
                    <div className="">{item.name}</div>
                    <div className="">Qty: {item.quantity}</div>
                  </div>
                  <div
                    onClick={() => handleDeleteitem(item)}
                    className="cursor-bold flex w-full cursor-pointer justify-end text-lg"
                  >
                    {/* <FaTrash /> */}
                    <MdDeleteOutline />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="my-2 flex w-full justify-between border-y-2 border-gray-400 border-opacity-25 px-4 py-2">
            {/* total */}
            <span>Sub-total</span>
            <span>${total}</span>
          </div>
          <div className="flex gap-2 px-4">
            {/* buttons */}
            <button className="w-full bg-gray-100 py-2">View Cart</button>
            <button className="w-full bg-[#57bf9c] py-2 text-white ">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
