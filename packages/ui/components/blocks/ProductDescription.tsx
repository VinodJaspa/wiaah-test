import React, { useEffect, useState } from "react";
import { BuyerComment } from "./BuyerComment";
import { Collapse } from "antd";
import { t } from "i18next";
import { useProductDescTabs } from "../../Hooks";

const { Panel } = Collapse;

export interface ProductDescriptionProps {
  /**
   * How large should the button be?
   */
  description: string;
  /**
   * Primary UI component for user interaction
   */
  comments: Array<{
    name: string;
    date: string;
    rating: number;
    comment: string;
  }>;
}
/**
 * Product full description and reviews component.
 */
export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  comments,
  description = "Product Description here!",
}) => {
  const { tab, ChangeTab } = useProductDescTabs();

  return (
    <>
      <div id="reviews" className="">
        <div className="mb-10 block md:hidden">
          <Collapse ghost>
            <Panel
              header={
                <span className="uppercase">
                  {t("Description", "Description")}
                </span>
              }
              key="1"
            >
              <div>{description}</div>
            </Panel>
            <Panel
              header={
                <span className="uppercase">
                  {t("Reviews", "Reviews") + " (" + comments.length + ")"}
                </span>
              }
              key="2"
            >
              <p>
                {comments.map((item, key: number) => {
                  return (
                    <div className="mt-3" key={key}>
                      <BuyerComment
                        name={item.name}
                        date={item.date}
                        rating={item.rating}
                        comment={item.comment}
                      />
                    </div>
                  );
                })}
              </p>
            </Panel>
          </Collapse>
        </div>
        <div className="hidden w-full md:inline-block">
          <div className="product-tab-titles">
            <button
              onClick={() => {
                ChangeTab("description");
              }}
              className={`${
                tab === "description"
                  ? "green-background text-white"
                  : "text-gray-500"
              }  h-9 px-4`}
            >
              {t("Description", "Description")}
            </button>
            <button
              onClick={() => {
                ChangeTab("reviews");
              }}
              className={`${
                tab === "reviews"
                  ? "green-background text-white"
                  : "text-gray-500"
              }  h-9 px-4`}
            >
              {t("Reviews", "Reviews")} ({comments.length})
            </button>
          </div>
          <div
            className={`${
              tab === "reviews" ? "" : "hidden"
            } h-96 overflow-scroll`}
          >
            {comments.map((item, key: number) => {
              return (
                <div className="mt-3" key={key}>
                  <BuyerComment
                    name={item.name}
                    date={item.date}
                    rating={item.rating}
                    comment={item.comment}
                  />
                </div>
              );
            })}
          </div>
          <div
            className={`${
              tab === "description" ? "" : "hidden"
            } no-scroll mt-2 h-96 overflow-scroll rounded-lg border-2 border-gray-500  border-opacity-30 p-3`}
          >
            <div>{description}</div>
          </div>
        </div>
      </div>
    </>
  );
};
