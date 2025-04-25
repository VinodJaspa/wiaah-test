
import { ProductType } from "@features/API";
import {
  Button,
  Divider,
  EditNoteIcon,
  HStack,
  Image,
  PriceDisplay,
  Radio,
  ShadcnBox,
  TrashIcon,
  Verified,
} from "@UI";
import { cn } from "@UI/components/shadcn-components/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { GiCheckMark } from "react-icons/gi";
import { mapArray } from "utils";

interface CustomPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  trigger: React.ReactElement;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({
  isOpen,
  onClose,
  children,
  trigger,
}) => {
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 });

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  React.useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <div ref={triggerRef}>{trigger}</div>
      {isOpen && (
        <div
          ref={popoverRef}
          className="fixed bg-white rounded-md shadow-lg border border-gray-200 z-50"
          style={{
            width: `${position.width}px`,
            top: `${position.top}px`,
            left: `${position.left}px`,
            maxHeight: "200px",
            overflow: "auto",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export interface ProductCheckoutCardProps {
  id: string;
  shopName: string;
  shopVerified: boolean;
  title: string;
  size: string;
  color: string;
  thumbnail: string;
  qty: number;
  price: number;
  total: number;
  shippingMethods: {
    name: string;
    price: number;
    deliveryRange: [number, number];
  }[];
  type: ProductType;
  format?: string;
  onItemDelete?: (id: string) => void;
  onMoveToWishlist?: (id: string) => void;
}

export const ProductCheckoutCard: React.FC<ProductCheckoutCardProps> = ({
  color,
  price,
  qty,
  shippingMethods,
  shopName,
  shopVerified,
  size,
  thumbnail,
  total,
  id,
  title,
  type,
  format,
  onItemDelete,
  onMoveToWishlist,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const [quantity, setQuantity] = React.useState<number>(qty || 0);
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  const onToggle = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function handleMoveToWishList() {
    if (onMoveToWishlist) {
      onMoveToWishlist(id);
    }
  }
  function handleItemDeletion() {
    if (onItemDelete) {
      onItemDelete(id);
    }
  }

  const showOn = (types: ProductType[]) => types.includes(type);

  const quantityOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleQtyChange = (newQty: number) => {
    setQuantity(newQty);
    onClose();
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-3 relative overflow-hidden">
          <span className="absolute top-0 left-0 font-semibold bg-red-500 px-3 py-2 rounded-tl-[0.625rem] rounded-br-[0.625rem] text-white">
            5% CASHBACK
          </span>
          <Image
            src={thumbnail}
            className="rounded-[0.625rem] h-[11.813rem] object-cover min-w-[13.75rem]"
          />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <HStack className="text-lg">
                <p className="font-semibold ">{shopName}</p>
                {shopVerified ? <Verified className="text-primary" /> : null}
              </HStack>
              <p className="font-semibold text-2xl">{title}</p>
              <div className=""></div>
            </div>

            {showOn([ProductType.Digital]) ? (
              <div className="rounded-md bg-iconGray w-12 h-9 flex justify-center items-center text-white text-lg font-medium uppercase">
                {format}
              </div>
            ) : null}

            {showOn([ProductType.Goods]) ? (
              <>
                <HStack>
                  {/* <p className="font-medium text-lg">{t("Selected Size")}:</p> */}
                  <div className="rounded-md bg-primary w-9 h-9 flex justify-center items-center text-white text-lg font-medium uppercase">
                    {size}
                  </div>
                </HStack>
                <HStack>
                  <p className="font-medium text-lg">{t("Selected Colour")}:</p>
                  <div className="border-primary rounded-md p-[0.125rem] border-2 w-9 h-9 text-lg font-medium">
                    <div
                      style={{ backgroundColor: `${color}` }}
                      className="w-full h-full rounded-md flex justify-center items-center"
                    >
                      <GiCheckMark className="text-white" />
                    </div>
                  </div>
                </HStack>
              </>
            ) : null}
          </div>
        </div>

        {showOn([ProductType.Goods]) ? (
          <>
            <p className="font-semibold text-[1.375rem]">
              {t("Order details")}:
            </p>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[1.375rem] border-b-2 border-b-black pb-2 w-fit">
                {t("Quantity")}
              </p>
              <p className="font-medium text-lg whitespace-nowrap flex items-center gap-1">
                {qty} {t("Unit")}{" "}
                <span className="flex font-normal text-base">
                  (<PriceDisplay price={price}></PriceDisplay>/{t("Unit")})
                </span>
              </p>
            </div>
          </>
        ) : null}

        {showOn([ProductType.Goods]) ? (
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[1.375rem] border-b-2 border-b-black pb-2 w-fit">
              {t("Shipping method")}
            </p>

            {mapArray(shippingMethods, (v, i) => (
              <div className="w-full grid grid-cols-12 gap-2">
                <div className="col-span-4 font-medium">
                  <Radio
                    name={`shipping-${id}`}
                    className=""
                    colorScheme="black"
                  >
                    {v.name}
                  </Radio>
                </div>
                <PriceDisplay
                  className="col-span-2 font-bold text-xl"
                  price={v.price}
                ></PriceDisplay>
                <p className="font-medium col-span-3">{t("Avaiable in")}</p>
                <p className="text-xl font-bold col-span-3">
                  {v.deliveryRange?.at(0)}-{v.deliveryRange?.at(1)} {t("Days")}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 w-full">
          <HStack className="justify-end text-[1.75rem] font-bold">
            <PriceDisplay price={total} />
          </HStack>
          <div className="flex justify-end w-full gap-4 items-center relative">
            <CustomPopover
              isOpen={isOpen}
              onClose={onClose}
              trigger={
                <Button
                  ref={triggerRef}
                  colorScheme="darkbrown"
                  onClick={onToggle}
                  center
                  className="px-5 text-2xl py-[0.875rem]"
                >
                  <HStack className="text-lg font-semibold">
                    <EditNoteIcon />
                    {t("Modify Quantity")}
                  </HStack>
                </Button>
              }
            >
              {quantityOptions.map((qt) => (
                <ShadcnBox
                  key={qt}
                  className={cn(
                    "p-3 cursor-pointer text-center border-b border-gray-200",
                    qt === quantity ? "bg-blue-100" : "bg-transparent",
                    "hover:bg-gray-100 last:border-none"
                  )}
                  onClick={() => handleQtyChange(qt)}
                >
                  {qt}
                </ShadcnBox>

              ))}
            </CustomPopover>

            <Button
              onClick={() => onItemDelete && onItemDelete(id)}
              colorScheme="danger"
              center
              className="px-5 text-2xl py-[0.875rem]"
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>
      <Divider className="border-black my-3" />
    </React.Fragment>
  );
};
