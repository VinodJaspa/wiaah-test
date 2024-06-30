import { act } from "react-dom/test-utils";
import { QueryClient, QueryClientProvider } from "react-query";

// const AllTheProviders: FC = ({ children }) => {
//   return (
//     <RecoilRoot>
//       <ChakraProvider theme={theme}>{children}</ChakraProvider>
//     </RecoilRoot>
//   );
// };

// const customRender = (
//   ui: ReactElement,
//   options?: Omit<RenderOptions, "wrapper">
// ) => render(ui, { wrapper: AllTheProviders, ...options });

// export * from "@testing-library/react";
// export { customRender as render };
export function setTestid(id: string): object {
  return { "data-testid": id };
}

export function getTestId(id: string): string {
  return `[data-testid='${id}']`;
}
export function getRoleId(id: string): string {
  return `[role='${id}']`;
}

export const waitFor = (
  callback: () => any,
  { interval = 50, timeout = 1000 } = {},
) =>
  act(
    () =>
      new Promise((resolve, reject) => {
        const startTime = Date.now();

        const nextInterval = () => {
          setTimeout(() => {
            try {
              callback();
              resolve();
            } catch (err) {
              if (Date.now() - startTime > timeout) {
                reject(new Error(`Timed out. ${err}`));
              } else {
                nextInterval();
              }
            }
          }, interval);
        };

        nextInterval();
      }),
  );

export const QueryClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <QueryClientProvider client={new QueryClient()}>
    {/* @ts-ignore */}
    {children}
  </QueryClientProvider>
);
