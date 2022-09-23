import React from "react";
import { randomNum } from "utils";
import { Divider } from "ui";

export interface GridListOrganiser {
  presets: GridPreset[];
  rowSize?: string;
}

export const GridListOrganiser: React.FC<GridListOrganiser> = ({
  presets,
  children,
  rowSize,
}) => {
  const [childsCount, setChildCount] = React.useState<number>(0);
  const [presetDisplayers, setPresetDisplayers] = React.useState<
    {
      preset: GridPreset;
      childsPos: [number, number];
    }[]
  >([]);

  if (childsCount < React.Children.count(children) - 1) {
    const randomPreset = presets[randomNum(presets.length)];

    setPresetDisplayers((state) => [
      ...state,
      {
        preset: randomPreset,
        childsPos: [childsCount, childsCount + randomPreset.length],
      },
    ]);

    setChildCount((state) => state + randomPreset.length);
  }

  return (
    <div className="flex flex-col w-full gap-4">
      {Array.isArray(presetDisplayers)
        ? presetDisplayers.map(({ preset, childsPos: [from, to] }, idx) => (
            <React.Fragment key={idx}>
              <GridPresetOrganiser rowSize={rowSize} preset={preset}>
                {React.Children.toArray(children).slice(from, to)}
              </GridPresetOrganiser>
              {/* <Divider /> */}
            </React.Fragment>
          ))
        : null}
    </div>
  );
};

export type GridPreset = {
  length: number;
  cols: number;
  points: {
    c: number;
    r: number;
  }[];
};

export interface GridPresetOrganiserProps {
  preset: GridPreset;
  rowSize?: string;
}
export const GridPresetOrganiser: React.FC<GridPresetOrganiserProps> = ({
  children,
  preset,
  rowSize = "14.5rem",
}) => {
  return (
    <div
      style={{
        gridAutoRows: rowSize,
      }}
      className={`grid gap-4 ${preset ? `grid-cols-${preset.cols || 1}` : ""}`}
    >
      {preset
        ? Array.isArray(preset.points)
          ? preset.points.map((point, i) => (
              <div
                style={{
                  gridRow: `span ${typeof point.r === "number" ? point.r : 1}`,
                  gridColumn: `span ${
                    typeof point.c === "number" ? point.c : 1
                  }`,
                }}
                key={i}
              >
                {React.Children.toArray(children).at(i)}
              </div>
            ))
          : null
        : null}
    </div>
  );
};
