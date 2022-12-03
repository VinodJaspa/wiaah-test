import React from "react";

export const useYearController = () => {
  const currentYear = new Date(Date.now()).getFullYear();
  const [year, setYear] = React.useState<number>(currentYear);

  function NextYear() {
    setYear((year) => year + 1);
  }

  function PreviousYear() {
    setYear((year) => year - 1);
  }
  return {
    year,
    currentYear,
    NextYear,
    PreviousYear,
  };
};
