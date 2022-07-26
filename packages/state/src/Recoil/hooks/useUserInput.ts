import { useRecoilValue, useSetRecoilState } from "recoil";
import { removePropFromObject } from "utils";
import { userInputState } from "../User/userInput";

export const useGetUserInput = () => {
  const input = useRecoilValue(userInputState);

  return {
    input,
  };
};

export const useSetUserInput = () => {
  const setUserInput = useSetRecoilState(userInputState);

  const addInput = (input: Record<string, any>) => {
    setUserInput((state) => ({ ...state, ...input }));
  };

  const removeInput = (key: string) => {
    setUserInput((state) => {
      removePropFromObject(state, key);
    });
  };

  return {
    addInput,
    removeInput,
  };
};
