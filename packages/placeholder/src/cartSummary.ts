import { CartSummaryItemData } from "types";

export const CartSummaryProductsPH: CartSummaryItemData[] = [
  {
    shop: {
      id: "1",
      imageUrl: "/shop-2.jpeg",
      name: "Wiaah",
    },
    item: {
      id: "1",
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
  },
  {
    shop: {
      id: "2",
      imageUrl: "/shop.jpeg",
      name: "Wiaah",
    },
    item: {
      id: "2",
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
      location: "123 main st apt 4 atlana ga",
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
  },
];
