import { ServiceCheckoutDataType } from "api";
import { ServiceCheckoutCard } from "@UI/components/features/Services/components/Cards/ServicesCheckoutCards/HotelCheckoutCard";
import { ProductCheckoutCard } from "@UI/components/features/Checkout/components/cards/ProductCheckoutCard";
import React from "react";
import { ProductType, ServiceType } from "@features/API";

export interface ServiceCheckoutCardSwitcherProps {
  service: ServiceCheckoutDataType;
  passingProps?: any;
}

const STATIC_CHECKIN = new Date("2023-10-10T00:00:00");
const STATIC_CHECKOUT = new Date("2023-10-15T00:00:00");

export const ServiceCheckoutCardSwitcher: React.FC<
  ServiceCheckoutCardSwitcherProps
> = ({ service: item, passingProps }) => {
  if (!item) return null;

  const commonDateProps = {
    checkin: STATIC_CHECKIN,
    checkout: STATIC_CHECKOUT,
  };

  switch (item.type) {
    case ServiceType.Hotel:
      return (
        <ServiceCheckoutCard
          {...commonDateProps}
          shopName="Padma Resort Legian"
          amenities={[
            { slug: "wifi", label: "Free WIFI" },
            { label: "Free Movies", slug: "movies" },
          ]}
          cancelationPolicy={{
            cost: 50,
            duration: 15,
          }}
          extras={[{ cost: 50, name: "Mini-bar-20" }]}
          fullAddress="No.1 PO BOX 1107, legian, Indonesia"
          guests={{
            adults: 2,
            childrens: 1,
          }}
          name="Standard room"
          thumbnail="https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg"
          total={500}
          serviceType={ServiceType.Hotel}
        />
      );
    case ServiceType.HolidayRentals:
      return (
        <ServiceCheckoutCard
          {...commonDateProps}
          shopName="Padma Resort Legian"
          amenities={[]}
          cancelationPolicy={{
            cost: 50,
            duration: 15,
          }}
          extras={[{ cost: 50, name: "Mini-bar-20" }]}
          fullAddress="No.1 PO BOX 1107, legian, Indonesia"
          guests={{
            adults: 2,
            childrens: 1,
          }}
          name="Standard room"
          thumbnail="https://www.hotel-montana.ch/bilder/hauptbilder/restaurant-bar/_1200xAUTO_crop_center-center_100_none/2210_Scala-4.jpg"
          total={500}
          serviceType={ServiceType.Restaurant}
          menus={[
            {
              name: "Starter",
              dishs: [
                {
                  name: "Fried Calamari",
                  ingredints: ["Tomato", "Mozzarella", "Basil"],
                  price: 100,
                  qty: 2,
                  thumbnail: "/dish-1.png",
                },
                {
                  name: "Shrimp cocktail",
                  ingredints: ["Tomato", "Mozzarella", "Basil"],
                  price: 100,
                  qty: 1,
                  thumbnail: "/dish-2.png",
                },
              ],
            },
            {
              name: "Main dish",
              dishs: [
                {
                  name: "Grilled salmon",
                  ingredints: ["Tomato", "Mozzarella", "Basil"],
                  price: 100,
                  qty: 2,
                  thumbnail: "/dish-3.png",
                },
                {
                  name: "Beef Bourguignon",
                  ingredints: ["Tomato", "Mozzarella", "Basil"],
                  price: 100,
                  qty: 1,
                  thumbnail: "/dish-4.png",
                },
              ],
            },
            {
              name: "Dessert",
              dishs: [
                {
                  name: "Chocolate mousse",
                  ingredints: ["Tomato", "Mozzarella", "Basil"],
                  price: 100,
                  qty: 2,
                  thumbnail: "/dish-5.png",
                },
                {
                  name: "Strawberry cake",
                  ingredints: ["Tomato", "Mozzarella", "Basil"],
                  price: 100,
                  qty: 1,
                  thumbnail: "/dish-6.png",
                },
              ],
            },
            {
              name: "Drinks",
              dishs: [
                {
                  name: "Mojito",
                  ingredints: ["Tomato", "Mozzarella", "Basil"],
                  price: 100,
                  qty: 2,
                  thumbnail: "/dish-7.png",
                },
                {
                  name: "Whiskey sour",
                  ingredints: ["Tomato", "Mozzarella", "Basil"],
                  price: 100,
                  qty: 1,
                  thumbnail: "/dish-8.png",
                },
              ],
            },
          ]}
        />
      );

    case ServiceType.HealthCenter:
      return (
        <ServiceCheckoutCard
          {...commonDateProps}
          shopName="Oasis Wellness Center"
          amenities={[]}
          cancelationPolicy={{
            cost: 50,
            duration: 15,
          }}
          extras={[{ cost: 50, name: "Mini-bar-20" }]}
          fullAddress="No.1 PO BOX 1107, legian, Indonesia"
          guests={{
            adults: 2,
            childrens: 1,
          }}
          name="Velvet Beauty Parior"
          thumbnail="https://www.alamedahealthconsortium.org/wp-content/uploads/2018/12/Braley_20121120_7963.jpg"
          total={500}
          serviceType={ServiceType.HealthCenter}
          doctors={[
            {
              thumbnail: "/doctor-1.png",
              name: "Dr. Michael Chen",
              price: 100,
              speciality: "Cardiologist",
            },
            {
              thumbnail: "/doctor-2.png",
              name: "Dr. Sarah Johnson",
              price: 1000,
              speciality: "Gastroenterologist",
            },
            {
              thumbnail: "/doctor-3.png",
              name: "Dr. Maria Rodriguez",
              price: 400,
              speciality: "Infectious Disease Specialist",
            },
          ]}
        />
      );
    case ServiceType.BeautyCenter:
      return (
        <ServiceCheckoutCard
          {...commonDateProps}
          shopName="Velvet Beauty Parior"
          amenities={[]}
          cancelationPolicy={{
            cost: 50,
            duration: 15,
          }}
          extras={[{ cost: 50, name: "Mini-bar-20" }]}
          fullAddress="No.1 PO BOX 1107, legian, Indonesia"
          guests={{
            adults: 2,
            childrens: 1,
          }}
          name="Standard room"
          thumbnail="https://mostaql.hsoubcdn.com/uploads/thumbnails/835649/5fb1c7c34bc0a/Beauty-Centre-1.jpg"
          total={500}
          serviceType={ServiceType.BeautyCenter}
          treatments={[
            {
              name: "Body treatment - back pain treatment",
              price: 100,
              thumbnail: "/treatment-back.png",
              qty: 2,
            },
            {
              name: "Microdermabrasion - dead skin cells treatment",
              price: 1000,
              thumbnail: "/treatment-skincare.png",
              qty: 2,
            },
            {
              name: "treatmentChemical peel - remove the top layer of dead skin cells",
              price: 400,
              thumbnail: "/treatment-peel.png",
              qty: 2,
            },
          ]}
        />
      );
    case ServiceType.Vehicle:
      return (
        <ServiceCheckoutCard
          {...commonDateProps}
          shopName="Padma Resort Legian"
          amenities={[
            { slug: "a/c", label: "A/C" },
            { label: "GPS", slug: "gps" },
            { label: "5", slug: "passengers" },
            { label: "2", slug: "bags" },
          ]}
          cancelationPolicy={{
            cost: 50,
            duration: 15,
          }}
          extras={[{ cost: 50, name: "Mini-bar-20" }]}
          fullAddress="No.1 PO BOX 1107, legian, Indonesia"
          guests={{
            adults: 2,
            childrens: 1,
          }}
          name="Range Rover Evoque - 2021"
          thumbnail="https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=1.00xw:0.847xh;0,0.153xh&resize=1200:*"
          total={500}
          serviceType={ServiceType.Vehicle}
        />
      );
    case "product":
      return item.data.type === ProductType.Goods ? (
        <ProductCheckoutCard
          id="1"
          color="#F5E0A1"
          price={100}
          qty={5}
          shippingMethods={[
            { name: "European Union", deliveryRange: [5, 7], price: 50 },
            { name: "Click & Collect", deliveryRange: [5, 7], price: 50 },
            { name: "International", deliveryRange: [5, 7], price: 50 },
          ]}
          type={ProductType.Goods}
          shopName="Nike"
          shopVerified={true}
          size="XL"
          thumbnail="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/g1ljiszo4qhthfpluzbt/nike-joyride.jpg"
          title="Nike Joyride"
          total={500}
        />
      ) : (
        <ProductCheckoutCard
          id="1"
          color="#F5E0A1"
          price={100}
          qty={5}
          shippingMethods={[
            { name: "European Union", deliveryRange: [5, 7], price: 50 },
            { name: "Click & Collect", deliveryRange: [5, 7], price: 50 },
            { name: "International", deliveryRange: [5, 7], price: 50 },
          ]}
          type={ProductType.Digital}
          shopName="Studio"
          shopVerified={true}
          size="XL"
          thumbnail="https://yt3.googleusercontent.com/ytc/AL5GRJUJ6B0I0wJMRqqQ9AilX4jHKkTzrcN2c2scntUOcQ=s900-c-k-c0x00ffffff-no-rj"
          title="Figma eCommerce Wireframe"
          total={500}
          format="FIG"
        />
      );
    default:
      return null;
  }
};
