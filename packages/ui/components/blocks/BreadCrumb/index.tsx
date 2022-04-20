import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export type BreadCrumbLink = { text: string; url: string };

export interface BreadCrumbProps {
  links: Array<BreadCrumbLink>;
  onLinkClick: (link: BreadCrumbLink) => any;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({
  links,
  onLinkClick,
}) => {
  return (
    <Breadcrumb separator={<FaChevronRight />}>
      {links &&
        links.length > 0 &&
        links.map((link, i) => (
          <BreadcrumbItem isLastChild={i + 1 == links.length}>
            <BreadcrumbLink onClick={() => onLinkClick && onLinkClick(link)}>
              {link.text}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
    </Breadcrumb>
  );
};
