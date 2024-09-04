import { ArrElement, ProductSize } from "@UI/../types/src";
import { mapArray } from "@UI/../utils/src";
import { SpinnerFallback, useSocialControls } from "@blocks";
import { PresentationType } from "@features/API";
import { useGetProductDetailsQuery, useGetUserProducts } from "@features";
import {
  ArrowLeftAlt1Icon,
  ArrowLeftIcon,
  ArrowRightIcon,
  AspectRatio,
  Avatar,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  HStack,
  Image,
  PriceDisplay,
  SaveFlagOutlineIcon,
  ScrollCursorPaginationWrapper,
  ShareOutlineIcon,
  ShoppingCartOutlinePlusIcon,
  Slider,
  Verified,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";

export const ProductDetailsDrawer = () => {
  const { t } = useTranslation();

  const [idx, setIdx] = React.useState<number>(0);

  const { value, cancelViewProductDetails } =
    useSocialControls("productDetailsId");

  const {
    isLoading,
    isError,
    data: product,
  } = useGetProductDetailsQuery(
    { id: value! },
    { enabled: typeof value === "string" }
  );

  const { fetchNextPage, data, hasNextPage, error } = useGetUserProducts(
    { sellerId: product?.seller.profile?.id || "", take: 5 },
    {
      enabled: !!product?.seller.profile?.id!,
      getNextPageParam: (last) => last.nextCursor,
      getPreviousPageParam: (last) => last.cursor,
    }
  );

  return (
    <Drawer
      position="bottom"
      full
      onClose={cancelViewProductDetails}
      isOpen={!!value}
    >
      <DrawerContent>
        <DrawerHeader className="p-4 relative flex justify-center items-center">
          <div className="absolute top-1/2 left-4 -translate-y-1/2">
            <DrawerCloseButton>
              <ArrowLeftAlt1Icon />
            </DrawerCloseButton>
          </div>
          <p className="text-lg font-semibold w-full text-center">
            {t("Product")}
          </p>
        </DrawerHeader>

        <SpinnerFallback isLoading={isLoading} isError={isError}>
          {product ? (
            <div className="flex flex-col gap-6 px-4 pb-12">
              <div className="flex flex-col gap-4">
                <HStack>
                  <Avatar
                    className="min-w-[2.25rem]"
                    src={product?.seller?.profile?.photo}
                    name={product?.seller?.profile?.username}
                    alt={product?.seller?.profile?.username}
                  />
                  <p className="text-lg font-semibold">
                    {product?.seller?.profile?.username}
                  </p>
                  <Verified className="text-sm text-blue-500" />
                </HStack>
                <Slider onSliderChange={(v) => setIdx(v)} currentItemIdx={idx}>
                  {mapArray(product.presentations, (v, i) => (
                    <AspectRatio key={i} ratio={0.78}>
                      <div className="absolute  flex gap-2 top-2 left-1/2 -translate-x-1/2">
                        {[...Array(product.presentations)].map((_, i) => (
                          <div
                            className={`${i === idx ? "bg-primary w-4" : "bg-gray-400 w-2"
                              } h-2 rounded-full`}
                          />
                        ))}
                      </div>
                      <Image
                        className="w-full h-full rounded-xl object-cover"
                        src={v.src}
                      />
                    </AspectRatio>
                  ))}
                </Slider>
                <HStack className="justify-between">
                  <p className="text-[1.375rem] font-bold">{product.title}</p>
                  <HStack className="text-lg gap-4">
                    <SaveFlagOutlineIcon />
                    <ShareOutlineIcon />
                  </HStack>
                </HStack>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">{t("Select size")}</p>
                <HStack>
                  {mapArray(product.sizes, (v: ProductSize, i) => (
                    <div
                      key={i}
                      className="w-[2.375rem] h-[2.375rem] flex justify-center items-center border-2 border-primary rounded-[0.625rem] uppercase"
                    >
                      {v}
                    </div>
                  ))}
                </HStack>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">{t("Select Colour")}</p>
                <HStack>
                  {mapArray(product.colors, (v, i) => (
                    <div
                      key={i}
                      className={`${false ? "border-primary" : "border-white"
                        } border-[3px] rounded-md`}
                    >
                      <div
                        style={{
                          backgroundColor: v,
                        }}
                        className={`w-[1.875rem] h-[1.875rem] text-xs text-white uppercase rounded-md ${false
                            ? "border-white border-2"
                            : "border border-primary"
                          }`}
                      ></div>
                    </div>
                  ))}
                </HStack>
              </div>

              <HStack className="justify-between text-2xl font-bold">
                <PriceDisplay
                  price={product.price}
                  symbolProps={{ className: "text-primary text-3xl" }}
                />

                <Button colorScheme="darkbrown" className="text-base">
                  <HStack>
                    <ShoppingCartOutlinePlusIcon className="text-xl" />
                    <p>{t("Add to cart")}</p>
                  </HStack>
                </Button>
              </HStack>

              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">
                  {t("Other products by")}{" "}
                  {product.seller.profile?.username || t("this seller")}
                </p>
                <ScrollCursorPaginationWrapper
                  className="overflow-x-scroll pb-2"
                  controls={{
                    next: fetchNextPage,
                    hasMore: hasNextPage || false,
                  }}
                  axis="x"
                >
                  <HStack className="gap-4 w-fit">
                    {mapArray(
                      data?.pages?.reduce(
                        (acc, curr) => acc.concat(curr.data || []),
                        [] as ArrElement<(typeof data)["pages"]>["data"]
                      ),
                      (v, i) => (
                        <div className="w-[9.875rem] flex flex-col gap-1 overflow-hidden">
                          <Slider
                            draggingActive={false}
                            leftArrowComponent={<ArrowLeftIcon />}
                            rightArrowComponent={<ArrowRightIcon />}
                          >
                            {mapArray(
                              v.presentations.filter(
                                (v) => v.type === PresentationType.Image
                              ),
                              (e, i) => (
                                <AspectRatio ratio={0.85}>
                                  <Image
                                    src={e.src}
                                    className="rounded-lg h-full w-full object-cover"
                                    alt={v.title}
                                  />
                                </AspectRatio>
                              )
                            )}
                          </Slider>
                          <HStack className="justify-between gap-8 text-sm font-semibold">
                            <p>{v.title}</p>
                            <PriceDisplay price={v.price} />
                          </HStack>
                          <p className="text-[0.688rem]">{v.description}</p>
                        </div>
                      )
                    )}
                  </HStack>
                </ScrollCursorPaginationWrapper>
              </div>
            </div>
          ) : null}
        </SpinnerFallback>
      </DrawerContent>
    </Drawer>
  );
};
