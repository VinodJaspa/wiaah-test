import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export type BreadCrumbLink = { text: string; url: string };

export interface BreadCrumbProps {
  links: BreadCrumbLink[];
  onLinkClick?: (link: BreadCrumbLink) => any;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({
  links,
  onLinkClick,
}) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
    {links.map((link, i) => (
      <React.Fragment key={i}>
        <Link
          href={link.url}
          onClick={() => onLinkClick?.(link)}
          className="text-gray-500 hover:text-gray-700"
        >
          {link.text}
        </Link>
        {i + 1 !== links.length && <FaChevronRight className="text-gray-400" />}
      </React.Fragment>
    ))}
  </nav>
  );
};
