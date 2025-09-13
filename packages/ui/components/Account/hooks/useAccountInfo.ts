import { useRecoilValue } from "recoil";
import { accountInfoState } from "../recoil/accountState";


export const useAccountInfo = () => {
  return useRecoilValue(accountInfoState);
};
