import { useRecoilState } from "recoil";
import { AccountTypeState } from "state";
import { AccountType } from "types";

export const useAccountType = () => {
  const [type, setType] = useRecoilState(AccountTypeState);

  function setAccountType(type: AccountType) {
    setType(type);
  }

  return {
    accountType: type,
    setAccountType,
  };
};
