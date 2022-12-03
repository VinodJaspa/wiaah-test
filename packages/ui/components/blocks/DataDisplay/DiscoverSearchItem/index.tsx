import React from "react";

export interface DiscoverItemProps {
  thumbnail: string;
}

export const DiscoverItem: React.FC<DiscoverItemProps> = ({ thumbnail }) => {
  return <img className="shadow-md" src={thumbnail} />;
};
