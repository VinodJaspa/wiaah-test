import React, { useState, useRef, MouseEvent, TouchEvent } from "react";

interface DraggableComponentProps {
  onChange?: (position: { x: number; y: number }) => void;
  direction?: "horizontal" | "vertical" | "both";
  children?: React.ReactNode;
}

export const Draggable: React.FC<DraggableComponentProps> = ({
  onChange,
  direction = "both",
  children,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const { clientX, clientY } = getEventCoordinates(e);
    dragStartRef.current = { x: clientX, y: clientY };
    //@ts-ignore
    document.addEventListener("mousemove", handleDrag);
    //@ts-ignore
    document.addEventListener("touchmove", handleDrag, { passive: false });
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const { clientX, clientY } = getEventCoordinates(e);
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    let x = 0;
    let y = 0;
    if (direction === "horizontal") {
      x = deltaX;
    } else if (direction === "vertical") {
      y = deltaY;
    } else {
      x = deltaX;
      y = deltaY;
    }

    setPosition({ x, y });

    if (typeof onChange === "function") {
      onChange({ x, y });
    }
  };

  const handleDragEnd = () => {
    //@ts-ignore
    document.removeEventListener("mousemove", handleDrag);
    //@ts-ignore
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchend", handleDragEnd);
  };

  const getEventCoordinates = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e && e.touches.length > 0) {
      return {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      };
    } else {
      return {
        clientX: (e as MouseEvent).clientX,
        clientY: (e as MouseEvent).clientY,
      };
    }
  };

  return (
    <div
      ref={dragRef}
      style={{
        position: "relative",
        left: position.x,
        top: position.y,
        cursor: "move",
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {/*@ts-ignore*/}
      {children}
    </div>
  );
};
