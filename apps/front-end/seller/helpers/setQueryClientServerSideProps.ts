import { DehydratedState } from "react-query";

export const setQueryClientServerSideProps = (data: DehydratedState) => ({
  dehydratedState: data,
});
