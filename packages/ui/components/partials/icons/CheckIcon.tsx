import { HtmlSvgProps } from "@UI/../types/src";

export const CheckmarkCircleFillIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 37C28.9411 37 37 28.9411 37 19C37 9.05886 28.9411 0.999985 19 0.999985C9.05886 0.999985 0.999985 9.05886 0.999985 19C0.999985 28.9411 9.05886 37 19 37Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13 19.95L16.3 23.25L24.55 15"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const CheckmarkCircleOutlineIcon: React.FC<HtmlSvgProps> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99996 11.3334C8.94548 11.3334 11.3333 8.94554 11.3333 6.00002C11.3333 3.0545 8.94548 0.666687 5.99996 0.666687C3.05444 0.666687 0.666626 3.0545 0.666626 6.00002C0.666626 8.94554 3.05444 11.3334 5.99996 11.3334Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 6.66669L5.33333 8.00002L8.66667 4.66669"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
