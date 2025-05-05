import React from "react";
import { useTranslation } from "react-i18next";
import { HtmlDivProps } from "types";

export interface ScrollableContainerProps {
  children: React.ReactElement[];
  maxShowMoreItems?: number;
  maxInitialItems?: number;
  doesShowMore?: boolean;
  autoShowAll?:boolean
  containerProps?:HtmlDivProps
}

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  maxInitialItems = children.length,
  doesShowMore = true,
  maxShowMoreItems = maxInitialItems,
  autoShowAll,
  containerProps,
  
}) => {
const { t } = useTranslation();
  const [items, setItems] = React.useState<React.ReactElement[]>(
    Array.isArray(children) ? children.slice(0, maxInitialItems) : []
  );
  const [showMore, setShowMore] = React.useState<boolean>(false);
  const commentsContainerRef = React.useRef<HTMLDivElement>(null);
  const MockCommentsContainerRef = React.useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const isShowMore = (children.length || 1) > maxInitialItems && doesShowMore;

React.useEffect(()=>{
  if(autoShowAll){
    setShowMore(true)
  }else{
    setShowMore(false)
  }
},[autoShowAll])

  function setHeight() {
    const maxH = MockCommentsContainerRef.current?.offsetHeight;
    return maxH;
  }

  const containerHeight = setHeight();

  function handleLoaded() {
    setLoaded((state) => !state);
  }

  React.useEffect(() => {
    setItems(() => {
      if (children && !showMore) {
        return children.slice(0, maxInitialItems);
      } else {
        return children || [];
      }
    });
  }, [showMore]);

  function handleShowMoreComments() {
    setShowMore(true);
  }

  function handleShowLessComments() {
    if (commentsContainerRef.current && commentsContainerRef.current.scrollTo) {
      commentsContainerRef.current.scrollTo(0, 0);
    }
    setShowMore(false);
  }

  return (
    <div className="flex flex-col">
      <div className="flex relative" onLoad={handleLoaded}>
        <div
        {...containerProps}
          ref={commentsContainerRef}
          className={`${
            showMore ? "overflow-y-scroll" : "overflow-y-hidden"
          } ${containerProps ? containerProps.className || "" : ""} w-full flex flex-col thinScroll`}
          style={{
            height: containerHeight,
          }}
          data-testid="CommentsWrapper"
        >
          {items.map((Child, i) => (
            <React.Fragment key={i}>{Child}</React.Fragment>
          ))}
        </div>

        <div
        {...containerProps}
          className={`${containerProps ? containerProps.className || "" : ""} absolute w-full flex flex-col opacity-0 pointer-events-none`}
          onLoad={handleLoaded}
          ref={MockCommentsContainerRef}
        >
          {items
            .slice(0, showMore === true ? maxShowMoreItems : maxInitialItems)
            .map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
        </div>
      </div>
      {isShowMore && !autoShowAll ? (
        <div className="font-semibold cursor-pointer text-xl w-full py-2 text-center capitalize">
          {showMore === false ? (
            <span data-testid="ShowMoreBtn" onClick={handleShowMoreComments}>
              {t("show_more", "show more")}
            </span>
          ) : (
            <span data-testid="ShowLessBtn" onClick={handleShowLessComments}>
              {t("show_less", "show less")}
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
};
