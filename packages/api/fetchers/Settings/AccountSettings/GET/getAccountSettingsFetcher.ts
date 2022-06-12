import { UpdateAccouuntSettingsDto } from "types";
import { FetchingMock } from "utils";

export const getAccountSettingsFetcher =
  async (): Promise<UpdateAccouuntSettingsDto> => {
    await FetchingMock;
    return {
      address: "address 1",
      address2: "address 2",
      bio: "bio test",
      brandDescription: "brandDesc",
      city: "city",
      clientType: "individual",
      country: "EG",
      countryCode: "EG",
      email: "email@test.com",
      firstName: "first",
      language: "english",
      lastName: "last",
      phoneNumber: "1132121424",
      photoSrc: "/shop-1.jpeg",
      storeFor: [],
      username: "username",
    };
  };
