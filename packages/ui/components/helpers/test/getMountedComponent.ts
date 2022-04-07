import { ReactWrapper } from "enzyme";

export const getMountedComponent = (
  wrapper: ReactWrapper,
  uniqeSelector: string,
  depth?: number
): ReactWrapper => {
  const element = wrapper.find(uniqeSelector);
  if (element.length <= 1) return element;
  if (depth) {
    let child: ReactWrapper | undefined = undefined;
    for (let i = 0; i < depth; i++) {
      if (!child) {
        child = wrapper
          .find(uniqeSelector)
          .children()
          .hostNodes()
          .find(uniqeSelector);
      } else if (child && child.length > 1) {
        child = child
          .find(uniqeSelector)
          .children()
          .hostNodes()
          .find(uniqeSelector);
      } else {
        return child;
      }
    }
    if (child) return child;
    return wrapper
      .find(uniqeSelector)
      .children()
      .hostNodes()
      .find(uniqeSelector);
  } else {
    return wrapper
      .find(uniqeSelector)
      .children()
      .hostNodes()
      .find(uniqeSelector);
  }
};
