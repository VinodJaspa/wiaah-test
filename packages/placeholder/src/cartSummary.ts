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
          name: "Click & Collect",
          value: "click_and_collect",
          deliveryTime: {
            from: 2,
            to: 5,
          },
          id: "method1",
          cost: 0,
          description: "Pick up your order from our store.",
        },
        {
          name: "European union",
          value: "european_union",
          deliveryTime: {
            from: 5,
            to: 10,
          },
          id: "method2",
          cost: 10,
          description: "Shipping within European Union countries.",
        },
        {
          name: "International",
          value: "international",
          deliveryTime: {
            from: 7,
            to: 14,
          },
          id: "method3",
          cost: 20,
          description: "Shipping to international destinations outside EU.",
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
          name: "Click & Collect",
          value: "click_and_collect",
          deliveryTime: {
            from: 2,
            to: 5,
          },
          id: "method1",
          cost: 0,
          description: "Pick up your order from our store.",
        },
        {
          name: "European union",
          value: "european_union",
          deliveryTime: {
            from: 5,
            to: 10,
          },
          id: "method2",
          cost: 10,
          description: "Shipping within European Union countries.",
        },
        {
          name: "International",
          value: "international",
          deliveryTime: {
            from: 7,
            to: 14,
          },
          id: "method3",
          cost: 20,
          description: "Shipping to international destinations outside EU.",
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
