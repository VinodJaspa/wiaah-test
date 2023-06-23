import React from "react";

import { CountryLanguageCurrencySwitch } from "@UI/components";
import {
  CustomerService,
  Information,
  SocialMediaLinks,
  SubscribeForm,
} from "@UI";

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="block w-full bg-black p-6">
        <div className="container mx-auto">
          <div className="grid w-full grid-cols-1 place-content-center gap-4 md:grid-cols-3 lg:grid-cols-5">
            <SubscribeForm />
            <CustomerService />
            <Information />
            <SocialMediaLinks />
          </div>
          <CountryLanguageCurrencySwitch />
        </div>
      </footer>
    </>
  );
};
