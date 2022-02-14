import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export interface BreadCrumbProps {
  breadcrumb?: Array<{ text: string; url: string }>;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ breadcrumb = [] }) => {
  return (
    <ul>
      {breadcrumb.map((item, i: number) => {
        if (i + 1 == breadcrumb.length) {
          return (
            <li className="inline-flex text-xs" key={i}>
              {item.text}
            </li>
          );
        } else {
          return (
            <li className="inline-flex" key={i}>
              <div className="inline text-xs text-blue-500">
                <Link href={item.url}>
                  <a>{item.text}</a>
                </Link>
              </div>
              <FaChevronRight className="ml-3 mr-3 inline" />
            </li>
          );
        }
      })}
    </ul>
  );
};

BreadCrumb.defaultProps = {
  breadcrumb: [{ text: "Home", url: "/" }],
};
