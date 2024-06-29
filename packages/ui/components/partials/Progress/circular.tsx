import { HtmlDivProps } from "types";
import { AspectRatio } from "../AspectRatio";

interface CircularProgressProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  value: number;
  maxValue: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  maxValue,
  value,
  children,
}) => {
  const percent = value / maxValue;
  return (
    <AspectRatio ratio={1}>
      <div className="w-full h-full flex justify-center items-center">
        <svg
          className="absolute top-0 left-0"
          style={{
            rotate: "-90deg",
          }}
          strokeDasharray={40}
          strokeDashoffset={(1 - percent) * 40}
          width="100%"
          height="100%"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="0.07em"
        >
          <circle cx="8" cy="8" r="6.25" />
        </svg>
        <svg
          className="absolute top-0 left-0"
          width="100%"
          height="100%"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="0.05em"
          opacity={0.1}
        >
          <circle cx="8" cy="8" r="6.25" />
        </svg>
        {/* @ts-ignore */}
        {children}
      </div>
    </AspectRatio>
  );
};
