import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { AccountSettingsSection } from "@UI";
import * as apiHooks from "@UI/Hooks/ApiHooks";
import { UpdateAccouuntSettingsDto } from "types";
import { getMountedComponent, getTestId, waitFor } from "utils";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAccountType } from "hooks";

const selectors: Record<keyof UpdateAccouuntSettingsDto, string> = {
  address: "Address1Input",
  address2: "Address2Input",
  bio: "BioInput",
  brandDescription: "BrandDescriptionInput",
  city: "CityInput",
  clientType: "ClientTypeInput",
  country: "CountryInput",
  countryCode: "CountryCodeInput",
  email: "EmailInput",
  firstName: "FirstnameInput",
  language: "LanguageInput",
  lastName: "LastnameInput",
  phoneNumber: "PhoneNumberInput",
  photoSrc: "PhotoInput",
  storeFor: "StoreForInput",
  username: "UsernameInput",
  profilePhoto: "ProfilePhotoInput",
  shopType: "ShopTypeInput",
};

describe("AccountSettingsSection functionallity tests", () => {
  it("inputs should display the right values", async () => {
    const mockData: UpdateAccouuntSettingsDto = {
      address: "test address1",
      address2: "test address2",
      bio: "test bio",
      brandDescription: "test brand Desc",
      city: "test city",
      clientType: "professional",
      country: "egypt",
      countryCode: "EG",
      email: "test@test.com",
      firstName: "first name",
      language: "English",
      lastName: "last name",
      phoneNumber: "123456789",
      photoSrc: "/testsrc",
      storeFor: ["men", "women"],
      username: "User name",
      shopType: "shop 1",
      profilePhoto: undefined,
    };
    jest.mock(
      "ui",
      (): Partial<typeof apiHooks> => ({
        useGetAccountSettingsQuery: jest.fn().mockReturnValue({
          data: mockData,
        }),
      })
    );
    const Initilize: React.FC = ({ children }) => {
      const { setAccountType } = useAccountType();
      setAccountType("buyer");
      return <>{children}</>;
    };
    const wrapper = mount(
      <RecoilRoot>
        <QueryClientProvider client={new QueryClient()}>
          <Initilize>
            <AccountSettingsSection />;
          </Initilize>
        </QueryClientProvider>
      </RecoilRoot>
    );
    await waitFor(() => {
      wrapper.update();
      const address1 = getMountedComponent(
        wrapper,
        getTestId(selectors.address)
      );
      const address2 = getMountedComponent(
        wrapper,
        getTestId(selectors.address2)
      );
      const bio = getMountedComponent(wrapper, getTestId(selectors.bio));
      const brandDescription = getMountedComponent(
        wrapper,
        getTestId(selectors.brandDescription)
      );
      const city = getMountedComponent(wrapper, getTestId(selectors.city));
      const clientType = getMountedComponent(
        wrapper,
        getTestId(selectors.clientType)
      );
      const country = getMountedComponent(
        wrapper,
        getTestId(selectors.country)
      );
      const countryCode = getMountedComponent(
        wrapper,
        getTestId(selectors.countryCode)
      );
      const email = getMountedComponent(wrapper, getTestId(selectors.email));
      const firstName = getMountedComponent(
        wrapper,
        getTestId(selectors.firstName)
      );
      const language = getMountedComponent(
        wrapper,
        getTestId(selectors.language)
      );
      const lastName = getMountedComponent(
        wrapper,
        getTestId(selectors.lastName)
      );
      const phoneNumber = getMountedComponent(
        wrapper,
        getTestId(selectors.phoneNumber)
      );
      const photoSrc = getMountedComponent(
        wrapper,
        getTestId(selectors.photoSrc)
      );
      const profilePhoto = getMountedComponent(
        wrapper,
        getTestId(selectors.profilePhoto)
      );
      const storeFor = getMountedComponent(
        wrapper,
        getTestId(selectors.storeFor)
      );
      const username = getMountedComponent(
        wrapper,
        getTestId(selectors.username)
      );
      expect(address1.length).toBe(1);
      expect(address2.length).toBe(1);
      expect(bio.length).toBe(1);
      expect(brandDescription.length).toBe(0);
      expect(city.length).toBe(1);
      expect(clientType.length).toBe(1);
      expect(country.length).toBe(1);
      expect(countryCode.length).toBe(1);
      expect(email.length).toBe(1);
      expect(firstName.length).toBe(1);
      expect(language.length).toBe(1);
      expect(lastName.length).toBe(1);
      expect(phoneNumber.length).toBe(1);
      expect(photoSrc.length).toBe(1);
      expect(profilePhoto.length).toBe(1);
      expect(storeFor.length).toBe(1);
      expect(username.length).toBe(1);
    });
  });
});
