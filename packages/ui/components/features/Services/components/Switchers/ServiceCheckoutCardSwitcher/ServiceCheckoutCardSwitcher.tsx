import { ServiceCheckoutDataType } from "api";
import { ServiceCheckoutCard } from "@UI";
import React from "react";
import { ServiceType } from "@features/API";

export interface ServiceCheckoutCardSwitcherProps {
  service: ServiceCheckoutDataType;
  passingProps?: any;
}

export const ServiceCheckoutCardSwitcher: React.FC<
  ServiceCheckoutCardSwitcherProps
> = ({ service: item, passingProps }) => {
  if (!item) return null;
  switch (item.type) {
    case ServiceType.Hotel:
      return (
        <ServiceCheckoutCard
          shopName="Padma Resort Legian"
          amenities={[
            { slug: "wifi", label: "Free WIFI" },
            { label: "Free Movies", slug: "movies" },
          ]}
          cancelationPolicy={{
            cost: 50,
            duration: 15,
          }}
          checkin={new Date()}
          checkout={new Date(new Date().setDate(new Date().getDate() + 5))}
          extras={[{ cost: 50, name: "Mini-bar-20" }]}
          fullAddress="No.1 PO BOX 1107, legian, Indonesia"
          guests={{
            adults: 2,
            childrens: 1,
          }}
          name="Standard room"
          thumbnail="https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg"
          total={500}
          serviceType={ServiceType.Vehicle}
        />
      );
    case ServiceType.Restaurant:
      return (
        <ServiceCheckoutCard
          shopName="Padma Resort Legian"
          amenities={[
            { slug: "wifi", label: "Free WIFI" },
            { label: "Free Movies", slug: "movies" },
          ]}
          cancelationPolicy={{
            cost: 50,
            duration: 15,
          }}
          checkin={new Date()}
          checkout={new Date(new Date().setDate(new Date().getDate() + 5))}
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
        />
      );

    case ServiceType.HealthCenter:
      return (
        <ServiceCheckoutCard
          shopName="Oasis Wellness Center"
          amenities={[
            { slug: "wifi", label: "Free WIFI" },
            { label: "Free Movies", slug: "movies" },
          ]}
          cancelationPolicy={{
            cost: 50,
            duration: 15,
          }}
          checkin={new Date()}
          checkout={new Date(new Date().setDate(new Date().getDate() + 5))}
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
        />
      );
    case ServiceType.BeautyCenter:
      return (
        <ServiceCheckoutCard
          shopName="Velvet Beauty Parior"
          amenities={[{ label: "Free Movies", slug: "movies" }]}
          cancelationPolicy={{
            cost: 50,
            duration: 15,
          }}
          checkin={new Date()}
          checkout={new Date(new Date().setDate(new Date().getDate() + 5))}
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
        />
      );
    case ServiceType.Vehicle:
      return (
        <ServiceCheckoutCard
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
          checkin={new Date()}
          checkout={new Date(new Date().setDate(new Date().getDate() + 5))}
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
      return null;
    // return <ProductCheckoutCard {...passingProps} {...item.data} />;
    default:
      return "";
  }
};
