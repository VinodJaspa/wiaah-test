import React, { useState, useCallback } from "react";

const debounce = (limit: number, callback: () => any) => {
  let timeoutId: any;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, limit, args);
  };
};

function getDimensionObject(node: any) {
  if (node) {
    const rect = node.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      x: rect.x,
      y: rect.y,
      right: rect.right,
      bottom: rect.bottom,
    };
  }
  return null;
}

export function useBoundingRect(limit?: number) {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  React.useEffect(() => {
    if ("undefined" !== typeof window && node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node) || {})
        );

      measure();

      const listener = debounce(limit ? limit : 100, measure);

      window.addEventListener("resize", listener);
      window.addEventListener("scroll", listener);
      return () => {
        window.removeEventListener("resize", listener);
        window.removeEventListener("scroll", listener);
      };
    }
    return () => {
      if (node) {
        setNode(null);
      }
    };
  }, [node, limit]);

  return [ref, dimensions, node];
}
