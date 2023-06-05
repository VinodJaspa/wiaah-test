import { Image } from "@partials";
import { mapArray } from "@UI/../utils/src";
import React from "react";

type PostAttachmentData<TValue = string | number | Record<string, any>> =
  Record<
    number,
    {
      x: number;
      y: number;
      key: number;
      title: string;
      value: TValue;
    }
  >;

export const PostAttachmentInput: React.FC<{
  value: PostAttachmentData;
  onChange: (cb: (v: PostAttachmentData) => PostAttachmentData) => any;
  src: string;
}> = ({ src, value, onChange }) => {
  return (
    <div className="relative">
      <Image className="w-full h-full" src={src} />
      <div className="absolute border top-0 left-0 border-red-500 w-full h-full">
        <div className="w-full h-full relative">
          {mapArray(Object.entries(value), ([key, data], idx) => (
            <PostAttachmentDraggable
              data-testid="drag"
              key={idx}
              getPos={({ parentH, parentW }) => ({
                x: parentW * (data.x / 100),
                y: parentH * (data.y / 100),
              })}
              setPos={({ x, y, parentH, parentW }) => {
                const _x = x > 0 ? x / parentW : 0;
                const _y = y > 0 ? y / parentH : 0;

                const newTag = {
                  ...data,
                  x: _x * 100,
                  y: _y * 100,
                };
                console.log("moving", data.key);
                onChange && onChange((v) => ({ ...v, [key]: newTag }));
              }}
            >
              <PostAttachmentTag
                label={data.title}
                value={data.value}
                onClick={() => {}}
              ></PostAttachmentTag>
            </PostAttachmentDraggable>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PostAttachmentTag: React.FC<{
  label: string;
  value: any;
  onClick: (value: any) => any;
}> = ({ label, onClick, value }) => {
  return (
    <div
      onClick={() => onClick && onClick(value)}
      className="px-2 py-1 cursor-pointer select-none bg-primary-600 text-white backdrop-blur-sm bg-opacity-50 rounded"
    >
      {label}
    </div>
  );
};

import { useRef, useEffect } from "react";

interface DraggableProps {
  getPos: (dim: {
    parentW: number;
    parentH: number;
    parentX: number;
    parentY: number;
  }) => {
    x: number;
    y: number;
  };
  setPos: (post: {
    x: number;
    y: number;
    parentW: number;
    parentH: number;
    parentX: number;
    parentY: number;
  }) => any;
}

const PostAttachmentDraggable: React.FC<DraggableProps> = ({
  children,
  getPos,
  setPos,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (wrapperRef.current) {
        const parent = wrapperRef.current.parentElement as HTMLElement;
        const x =
          event.type === "touchmove"
            ? (event as TouchEvent).touches[0].clientX
            : (event as MouseEvent).clientX;
        const y =
          event.type === "touchmove"
            ? (event as TouchEvent).touches[0].clientY
            : (event as MouseEvent).clientY;
        const left =
          x -
          parent.getBoundingClientRect().left -
          wrapperRef.current.getBoundingClientRect().width / 2;
        const top = y - parent.getBoundingClientRect().top;

        setPos({
          x: Math.max(
            0,
            Math.min(left, parent.offsetWidth - wrapperRef.current.offsetWidth)
          ),
          y: Math.max(
            0,
            Math.min(top, parent.offsetHeight - wrapperRef.current.offsetHeight)
          ),
          parentH: parent.offsetHeight,
          parentW: parent.offsetWidth,
          parentX: parent.getBoundingClientRect().left,
          parentY: parent.getBoundingClientRect().top,
        });
      }
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchend", handleUp);
    };

    const handleDown = () => {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("mouseup", handleUp);
      document.addEventListener("touchend", handleUp);
    };

    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("mousedown", handleDown);
      wrapperRef.current.addEventListener("touchstart", handleDown);
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("mousedown", handleDown);
        wrapperRef.current.removeEventListener("touchstart", handleDown);
      }
    };
  }, [wrapperRef]);

  const pos = getPos({
    parentH: wrapperRef.current?.parentElement?.offsetHeight || 0,
    parentW: wrapperRef.current?.parentElement?.offsetWidth || 0,
    parentX:
      wrapperRef.current?.parentElement?.getBoundingClientRect().left || 0,
    parentY:
      wrapperRef.current?.parentElement?.getBoundingClientRect().top || 0,
  });
  React.useEffect(() => {}, [wrapperRef.current]);

  return (
    <div
      ref={wrapperRef}
      style={{
        zIndex: 10,
        position: "absolute",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      {children}
    </div>
  );
};

export default PostAttachmentDraggable;
