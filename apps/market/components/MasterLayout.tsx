import React, { useEffect } from "react";
import {
  Root,
  Header,
  Footer,
  AuthFooter,
  ImageCard,
  AuthPopup,
  SocialFooter,
  SocialHeader,
  SocialAuthFooter,
  CommentReportModal,
  RootProps,
} from "ui";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import {
  UserAddressesState,
  VoucherState,
  CheckoutProductsState,
} from "ui/state";
import { CartSummaryItem } from "types/market/CartSummary";
import { AddressCardDetails } from "types/market/AddressDetails.interface";
import { NavLink } from "types/sharedTypes/misc/NavLink";
import { Box } from "@chakra-ui/react";
import { Container, useLoginPopup } from "ui";
import { category } from "uris";

const products: CartSummaryItem[] = [
  {
    id: "2",

    imageUrl:
      "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    name: "item1",
    price: 15,
    qty: 3,
    shippingMotheds: [
      {
        deliveryTime: {
          from: 5,
          to: 7,
        },
        name: "European union",
        value: "european_union",
      },
      {
        deliveryTime: {
          from: 1,
          to: 3,
        },
        name: "Click & Collect",
        value: "click_and_collect",
      },
      {
        deliveryTime: {
          from: 6,
          to: 8,
        },
        name: "International",
        value: "international",
      },
    ],

    colors: ["relay blue/yellow"],
    sizes: ["One Size"],
    type: "product",
    cashback: {
      unit: "%",
      value: 10,
    },
    discount: {
      unit: "$",
      value: 5,
    },
    oldPrice: 20,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
  },
  {
    id: "3",
    imageUrl:
      "https://static.barcelo.com/content/dam/bhg/master/es/hoteles/guatemala/guatemala-city/barcelo-guatemala-city/carrusel/BGUA_VIEW_01.jpg.bhgimg.optm1100.jpg/1604614790315.jpg",
    name: "item1",
    price: 15,
    qty: 3,
    shippingMotheds: [
      {
        deliveryTime: {
          from: 5,
          to: 7,
        },
        name: "European union",
        value: "european_union",
      },
      {
        deliveryTime: {
          from: 1,
          to: 3,
        },
        name: "Click & Collect",
        value: "click_and_collect",
      },
      {
        deliveryTime: {
          from: 6,
          to: 8,
        },
        name: "International",
        value: "international",
      },
    ],
    type: "service",
    location: "123 main st apt 4 ",
    date: Date.now(),
    eventDuration: 20,
    eventAdresses: "test@adress.com",
    cashback: {
      unit: "%",
      value: 10,
    },
    discount: {
      unit: "$",
      value: 5,
    },
    oldPrice: 20,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloremque molestiae perferendis saepe? Tenetur, eligendi. Excepturi voluptate harum fuga! Consequatur?`,
  },
];

const userAddresses: AddressCardDetails[] = [
  {
    id: "1",
    firstName: "john",
    lastName: "doe",
    address: "123 street",
    address2: "321 street",
    city: "new york",
    country: "united states",
    zipCode: 123456,
    contact: "+123456789",
  },
  {
    id: "2",
    firstName: "john",
    lastName: "doe",
    address: "123 street",
    address2: "321 street",
    city: "new york",
    country: "united states",
    zipCode: 123456,
    contact: "+123456789",
  },
];

const navLinks: NavLink[] = [
  {
    name: {
      translationKey: "shoes",
      fallbackText: "shoes",
    },
    destination: `${category}/shoes`,
  },
  {
    name: {
      translationKey: "jewelry",
      fallbackText: "jewelry",
    },
    destination: `${category}/jewelry`,
  },
  {
    name: {
      translationKey: "clothing",
      fallbackText: "clothing",
    },
    destination: `${category}/clothing`,
  },
  {
    name: {
      translationKey: "accessories",
      fallbackText: "accessories",
    },
    destination: `${category}/accessories`,
  },
  {
    name: {
      translationKey: "shoes",
      fallbackText: "shoes",
    },
    destination: `${category}/shoes`,
  },
  {
    name: {
      translationKey: "jewelry",
      fallbackText: "jewelry",
    },
    destination: `${category}/jewelry`,
  },
  {
    name: {
      translationKey: "clothing",
      fallbackText: "clothing",
    },
    destination: `${category}/clothing`,
  },
  {
    name: {
      translationKey: "accessories",
      fallbackText: "accessories",
    },
    destination: `${category}/accessories`,
  },
  {
    name: {
      translationKey: "shoes",
      fallbackText: "shoes",
    },
    destination: `${category}/shoes`,
  },
  {
    name: {
      translationKey: "jewelry",
      fallbackText: "jewelry",
    },
    destination: `${category}/jewelry`,
  },
  {
    name: {
      translationKey: "clothing",
      fallbackText: "clothing",
    },
    destination: `${category}/clothing`,
  },
  {
    name: {
      translationKey: "accessories",
      fallbackText: "accessories",
    },
    destination: `${category}/accessories`,
  },
  {
    name: {
      translationKey: "shoes",
      fallbackText: "shoes",
    },
    destination: `${category}/shoes`,
  },
  {
    name: {
      translationKey: "jewelry",
      fallbackText: "jewelry",
    },
    destination: `${category}/jewelry`,
  },
  {
    name: {
      translationKey: "clothing",
      fallbackText: "clothing",
    },
    destination: `${category}/clothing`,
  },
  {
    name: {
      translationKey: "accessories",
      fallbackText: "accessories",
    },
    destination: `${category}/accessories`,
  },
  {
    name: {
      translationKey: "shoes",
      fallbackText: "shoes",
    },
    destination: `${category}/shoes`,
  },
  {
    name: {
      translationKey: "jewelry",
      fallbackText: "jewelry",
    },
    destination: `${category}/jewelry`,
  },
  {
    name: {
      translationKey: "clothing",
      fallbackText: "clothing",
    },
    destination: `${category}/clothing`,
  },
  {
    name: {
      translationKey: "accessories",
      fallbackText: "accessories",
    },
    destination: `${category}/accessories`,
  },
];

export interface MasterLayoutProps {
  social?: boolean;
  rootProps?: RootProps;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({
  children,
  social,
  rootProps,
}) => {
  let voucher;
  const { t, i18n } = useTranslation();
  const setCheckoutAddress = useSetRecoilState(UserAddressesState);
  const setVoucher = useSetRecoilState(VoucherState);
  const setProducts = useSetRecoilState(CheckoutProductsState);
  useEffect(() => {
    setProducts(products);
    setCheckoutAddress(userAddresses);
    setVoucher(voucher);
  }, []);

  const { OpenLoginPopup } = useLoginPopup();
  function handleOpenLogin() {
    OpenLoginPopup;
  }

  return (
    <Root {...rootProps}>
      <CommentReportModal />
      <AuthPopup />
      {!social && <Header />}
      {social && <SocialHeader />}
      <main className="flex w-full flex-col">{children}</main>
      {!social && <Footer />}
      {!social && <AuthFooter />}
      {!social && (
        <div className="container mx-auto block w-full space-y-6 py-6">
          <div className="flex w-full justify-center">
            <p className="text-2xl font-bold uppercase">
              {t("Our_Partners", "Our Partners")}
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i: number) => (
              <ImageCard key={i} imgUrl="/shop-3.jpeg" />
            ))}
          </div>
        </div>
      )}
      {!social && (
        <div className="flex w-full justify-start bg-gray-800 p-6">
          <p className="text-gray-500">
            Copyrights &copy; Wiaah 2021.
            {t("copyrights", "All Rights Reserved.")}
          </p>
        </div>
      )}
      {social && (
        <Box
          position={"fixed"}
          bottom="0px"
          w="100%"
          zIndex={50}
          visibility={{ sm: "hidden" }}
        >
          <SocialAuthFooter
            onLoginClick={handleOpenLogin}
            onSignupClick={handleOpenLogin}
          />
        </Box>
      )}
      {social && <SocialFooter copyRightYear={2022} />}
    </Root>
  );
};

export default MasterLayout;
