import { SearchFilterType } from "../../";

export const getResturantSearchFiltersFetcher = async (): Promise<
  SearchFilterType[]
> => {
  const filters: SearchFilterType[] = [
    {
      filterTitle: "Cuisines type",
      filterSlug: "cuisines_type",
      filterDisplay: "text",
      filterType: "check",
      filterOptions: [
        {
          optName: "Asain",
          optSlug: "asain",
        },
        {
          optName: "French",
          optSlug: "french",
        },
        {
          optName: "Italian",
          optSlug: "italian",
        },
        {
          optName: "Indian",
          optSlug: "indian",
        },
        {
          optName: "Traditional",
          optSlug: "traditional",
        },
        {
          optName: "Egyptian",
          optSlug: "egyptian",
        },
      ],
    },
    {
      filterTitle: "Setting and ambiance",
      filterSlug: "Setting_and_ambiance",
      filterDisplay: "text",
      filterType: "check",
      filterOptions: [
        {
          optName: "For Business",
          optSlug: "for_business",
        },
        {
          optName: "For Family",
          optSlug: "for_family",
        },
        {
          optName: "For Friends",
          optSlug: "for_friends",
        },
        {
          optName: "For Lovers",
          optSlug: "for_lovers",
        },
      ],
    },
    {
      filterTitle: "Dishes",
      filterSlug: "dishes",
      filterDisplay: "text",
      filterType: "check",
      filterOptions: [
        {
          optName: "Tapas",
          optSlug: "tapas",
        },
        {
          optName: "Pizza",
          optSlug: "pizza",
        },
        {
          optName: "Crepes",
          optSlug: "crepes",
        },
        {
          optName: "Burger",
          optSlug: "burger",
        },
        {
          optName: "Seafood",
          optSlug: "seafood",
        },
        {
          optName: "Wok",
          optSlug: "wok",
        },
        {
          optName: "Sushi",
          optSlug: "sushi",
        },
      ],
    },
    {
      filterTitle: "Price Range",
      filterSlug: "price_range",
      filterType: "range",
      maxRange: 10000,
      minRange: 10,
    },
    {
      filterTitle: "Speical offer",
      filterSlug: "special_offer",
      filterType: "check",
      filterDisplay: "text",
      filterOptions: [
        {
          optName: "-10% on the menu",
          optSlug: "-10%_on_the_menu",
        },
        {
          optName: "-20% on the menu",
          optSlug: "-20%_on_the_menu",
        },
        {
          optName: "-30% on the menu",
          optSlug: "-30%_on_the_menu",
        },
        {
          optName: "-40% on the menu",
          optSlug: "-40%_on_the_menu",
        },
        {
          optName: "-50% on the menu",
          optSlug: "-50%_on_the_menu",
        },
        {
          optName: "-60% on the menu",
          optSlug: "-60%_on_the_menu",
        },
      ],
    },
    {
      filterTitle: "Rating",
      filterSlug: "rating",
      filterType: "check",
      filterDisplay: "rate",
      filterOptions: [
        {
          optName: "1",
          optSlug: "1",
        },
        {
          optName: "2",
          optSlug: "2",
        },
        {
          optName: "3",
          optSlug: "3",
        },
        {
          optName: "4",
          optSlug: "4",
        },
        {
          optName: "5",
          optSlug: "5",
        },
      ],
    },
    {
      filterTitle: "Payment methods",
      filterSlug: "payment_methods",
      filterDisplay: "text",
      filterType: "check",
      filterOptions: [
        {
          optName: "Credit Card",
          optSlug: "credit_card",
        },
        {
          optName: "Visa",
          optSlug: "visa",
        },
        {
          optName: "Mastercard",
          optSlug: "mastercard",
        },
        {
          optName: "Check",
          optSlug: "check",
        },
        {
          optName: "Cash",
          optSlug: "cash",
        },
      ],
    },
  ];

  return filters;
};
