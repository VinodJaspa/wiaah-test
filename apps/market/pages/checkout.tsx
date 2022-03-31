import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { AddressCardDetails } from "types/market/AddressDetails.interface";
import { CartSummaryItem } from "types/market/CartSummary";
import { Collaboration, Container, Spacer } from "ui";
import { UserAddressesState } from "ui/state";
import { CheckoutView } from "../components/Checkout/CheckoutView";
import MasterLayout from "../components/MasterLayout";
interface CheckoutPageProps {
  userAddresses: AddressCardDetails[];
  Products: CartSummaryItem[];
}

export const getServerSideProps: GetServerSideProps<CheckoutPageProps> =
  async () => {
    // get user address call
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
    // get current shopping cart items
    const Products: CartSummaryItem[] = [
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

        color: "relay blue/yellow",
        size: "One Size",
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
    return {
      props: { userAddresses, Products },
    };
  };

const checkout: React.FC<CheckoutPageProps> = ({ userAddresses, Products }) => {
  const setCheckoutAddress = useSetRecoilState(UserAddressesState);
  useEffect(() => {
    setCheckoutAddress(userAddresses);
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log("pos", pos);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Wiaah | Checkout</title>
      </Head>
      <MasterLayout>
        <div className="bg-[#F3F3F3]">
          <Container>
            <CheckoutView products={Products || []} />
            <Spacer spaceInRem={4} />
          </Container>
        </div>
        <Container>
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default checkout;
