import { FormOptionType } from "types";

export const accountTypes: FormOptionType[] = [
  {
    name: {
      translationKey: "individual",
      fallbackText: "Individual",
    },
    value: "individual",
  },
  {
    name: {
      translationKey: "team",
      fallbackText: "Team",
    },
    value: "Team",
  },
];
