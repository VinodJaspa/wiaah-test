import { useRecoilState } from "recoil";
import { CurrentUserDataType } from "types";
import { UserDataState } from "state";

export const useUserData = () => {
  const [user, setUser] = useRecoilState(UserDataState);

  function initUserData(userData: CurrentUserDataType) {
    setUser(userData);
  }

  return {
    user,
    initUserData,
  };
};
