import React from "react";
import { randomNum } from "utils";

export interface GridListOrganiser {
  presets: GridPreset[];
  rowSize?: string;
  gap?: number;
}

export const GridListOrganiser: React.FC<GridListOrganiser> = ({
  presets,
  children,
  rowSize,
  gap = 1,
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
        childsPos: [childsCount, childsCount + randomPreset.points.length],
      },
    ]);

    setChildCount((state) => state + randomPreset.points.length);
  }

  return (
    <div className={`flex flex-col w-full gap-[${gap}rem]`}>
      {Array.isArray(presetDisplayers)
        ? presetDisplayers.map(({ preset, childsPos: [from, to] }, idx) => (
            <React.Fragment key={idx}>
              <GridPresetOrganiser gap={gap} rowSize={rowSize} preset={preset}>
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
  cols: number;
  points: {
    c: number;
    r: number;
  }[];
};

export interface GridPresetOrganiserProps {
  preset: GridPreset;
  rowSize?: string;
  gap?: number;
}
export const GridPresetOrganiser: React.FC<GridPresetOrganiserProps> = ({
  children,
  preset,
  rowSize = "14.5rem",
  gap = 1,
}) => {
  const pointsum = preset.points.reduce((acc, curr) => {
    return acc + curr.c * curr.r;
  }, 0);

  const isValid = pointsum % preset.cols === 0;

  return (
    <>
      {isValid ? (
        <div
          style={{
            gridAutoRows: rowSize,
          }}
          className={`grid gap-[${gap}rem] ${
            preset ? `grid-cols-${preset.cols || 1}` : ""
          }`}
        >
          {preset
            ? Array.isArray(preset.points)
              ? preset.points.map((point, i) => (
                  <div
                    style={{
                      gridRow: `span ${
                        typeof point.r === "number" ? point.r : 1
                      }`,
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
      ) : (
        <div className="w-full py-4 text-center">invalid grid Preset</div>
      )}
    </>
  );
};
