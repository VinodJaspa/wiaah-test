import { Country, City, State } from "country-state-city";
import { FlagIconCode } from "react-flag-kit";

export const countries = Country.getAllCountries();
export const getCountryByCode = (countryCode: string) =>
  Country.getCountryByCode(countryCode);
export const cities = City.getAllCities();
export const getCitiesOfCountry = (countryCode: string) =>
  City.getCitiesOfCountry(countryCode);
export const getCitiesOfState = (countryCode: string, stateCode: string) =>
  City.getCitiesOfState(countryCode, stateCode);
export const states = State.getAllStates();
export const getStatesOfCountry = (countryCode: string) =>
  State.getStatesOfCountry(countryCode);
export const getStateByCode = (stateCode: string) =>
  State.getStateByCode(stateCode);
export const getStateByCodeAndCountry = (
  stateCode: string,
  countryCode: string,
) => State.getStateByCodeAndCountry(stateCode, countryCode);

export enum WiaahLangId {
  EN = "en",
  FR = "fr",
  ES = "es",
  DE = "de",
}

export const WiaahLanguageCountriesIsoCodes = ["GB", "FR", "DE", "ES"];
export const WiaahLanguageCountries: {
  code: FlagIconCode;
  name: string;
  langId: WiaahLangId;
}[] = [
    {
      code: "GB",
      name: "English",
      langId: WiaahLangId.EN,
    },
    {
      code: "FR",
      name: "France",
      langId: WiaahLangId.FR,
    },
    {
      code: "DE",
      name: "Germany",
      langId: WiaahLangId.DE,
    },
    {
      code: "ES",
      name: "Spanish",
      langId: WiaahLangId.ES,
    },
  ];
