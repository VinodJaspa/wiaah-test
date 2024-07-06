import { ReactWrapper, ShallowWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

export function setTestid(id: string): object {
  return { "data-testid": id };
}

export function getTestId(id: string): string {
  return `[data-testid="${id}"]`;
}
export function getRoleId(id: string): string {
  return `[role='${id}']`;
}

export function getShallowInputFormField(node: ShallowWrapper): ShallowWrapper {
  return node.dive().find("Field");
}
import React from "react";
import { MaybeFn, runIfFn } from "../runIfFun";

export function MapChildren<TProps>(
  children: MaybeFn<TProps>,
  props: TProps
): React.ReactNode {
  return Array.isArray(children)
    ? children.map((child, i) => runIfFn(child, { key: i, ...props }))
    : runIfFn(children, props);
}

export function containsClassName(
  className: string,
  findClassName: string
): boolean {
  const findIdx = className.indexOf(findClassName);
  const findLeng = findClassName.length;
  const letterBefore = findIdx < 1 ? undefined : className.at(findIdx - 1);
  const letterAfter = className.at(findIdx + findLeng);

  const beforeCheck =
    typeof letterBefore === "undefined" || letterBefore === " ";
  const afterCheck = typeof letterAfter === "undefined" || letterAfter === " ";

  return beforeCheck && afterCheck;
}

export const FilterNodeByText = (text: string) => {
  return (node: ShallowWrapper | ReactWrapper) =>
    node.name() !== null && node.text() === text;
};

export const waitFor = (
  callback: () => any,
  { interval = 50, timeout = 3000 } = {}
) =>
  act(
    () =>
      new Promise<void>((resolve, reject) => {
        const startTime = Date.now();

        const nextInterval = () => {
          setTimeout(() => {
            try {
              callback();
              resolve();
            } catch (err) {
              if (Date.now() - startTime > timeout) {
                reject(`Timed out. ${err}`);
              } else {
                nextInterval();
              }
            }
          }, interval);
        };

        nextInterval();
      })
  );
