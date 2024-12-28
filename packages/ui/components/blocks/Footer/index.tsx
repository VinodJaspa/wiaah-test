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
      <footer className="block w-full bg-slate-800 p-6">
        <div className="container mx-auto">
          <div className="grid w-full grid-cols-1 place-content-center gap-4 md:grid-cols-3 lg:grid-cols-4">
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
