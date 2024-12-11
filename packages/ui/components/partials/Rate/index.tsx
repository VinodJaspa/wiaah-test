import React from "react";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { HtmlDivProps } from "types";
import { cn } from "utils";

export interface RateProps extends HtmlDivProps {
  rating: number;
  outOf?: number;
  allowHalf?: boolean;
  starSize?: number;
}

export const Rate: React.FC<RateProps> = ({
  outOf = 5,
  rating,
  allowHalf,
  className = "",
  starSize,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn("flex text-primary items-center gap-2", className)}
    >
      {[...Array(outOf)].map((_, i) => {
        if (i < Math.floor(rating)) {
          return <BsStarFill key={i} size={starSize} />;
        }
        if (allowHalf && i === Math.floor(rating) && rating % 1 >= 0.5) {
          return <BsStarHalf key={i} size={starSize} />;
        }
        return <BsStar key={i} />;
      })}
    </div>
  );
};

// export interface RateSelectableProps {
//   outOf: number;
//   allowHalf: boolean;
// }

// export const RateSelectable: React.FC<RateSelectableProps> = ({
//   outOf = 5,
//   allowHalf,
//   ...props
// }) => {
//   const reminder = rating % 1;
//   const half: boolean = reminder >= 0.5;
//   return (
//     <div
//       {...props}
//       className={`${className || ""} flex text-primary items-center gap-2`}
//     >
//       {[...Array(outOf)].map((_, i) => (
//         <React.Fragment key={i}>
//           {i < Math.floor(rating) ? (
//             <BsStarFill key={i} />
//           ) : half && allowHalf && Math.floor(rating) === i ? (
//             <BsStarHalf key={i} />
//           ) : (
//             <BsStar key={i} />
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };
