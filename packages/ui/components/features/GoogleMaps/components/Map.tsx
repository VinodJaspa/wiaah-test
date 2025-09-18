// @ts-nocheck
import React, { CSSProperties } from "react";

interface MapChildProps {
  map?: google.maps.Map;
}


// Make MapProps accept all google.maps.MapOptions
export interface MapProps extends Partial<google.maps.MapOptions> {
  style?: CSSProperties;
  className?: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  id?: string;
  mapId?: string;
  // / Required for the map
  center: google.maps.LatLngLiteral;
  zoom: number;

  // Optional Google Maps options
  fullscreenControl?: boolean;
  styles?: google.maps.MapTypeStyle[];
}

export const Map: React.FC<MapProps> = ({
  children,
  style,
  className,
  id,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map && window.google) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div id={id} ref={ref} style={style} className={className} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map } as MapChildProps);
        }
        return null;
      })}
    </>
  );
};
