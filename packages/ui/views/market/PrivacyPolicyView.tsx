import React, { FC } from "react";

export const PrivacyPolicy: FC = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-8 text-3xl">
      <div className="flex w-fit flex-col items-center gap-2 ">
        <h1 className="px-2">Privacy Policy</h1>
        <div className="h-1 w-full rounded bg-black"></div>
      </div>
      <p className="w-8/12 text-center text-lg lg:mx-32">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
        officia ipsum exercitationem tempora porro atque reprehenderit
        distinctio itaque cum molestias deleniti animi, ab aliquam id? Delectus
        consequatur provident debitis odio asperiores dolores nam nesciunt ab
        quia ea. Nesciunt nostrum in, vero expedita, quia modi reiciendis iusto
        nam harum distinctio et?
      </p>
    </div>
  );
};
