import { Country, City, State } from "country-state-city";

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
  countryCode: string
) => State.getStateByCodeAndCountry(stateCode, countryCode);

export const WiaahLanguageCountriesIsoCodes = ["GB", "FR", "DE", "ES"];
export const WiaahLanguageCountries: { code: string; name: string }[] = [
  {
    code: "GB",
    name: "English",
  },
  {
    code: "FR",
    name: "France",
  },
  {
    code: "DE",
    name: "Germany",
  },
  {
    code: "ES",
    name: "Spanish",
  },
];
