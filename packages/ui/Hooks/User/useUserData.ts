import { useRecoilState } from "recoil";
import { CurrentUserDataType } from "types";
import { UserDataState } from "../../state/Recoil/User";

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
