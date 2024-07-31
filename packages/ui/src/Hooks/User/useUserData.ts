import { UserDataState } from "@UI/../state";
import { useRecoilState } from "recoil";
import { CurrentUserDataType } from "types";

export const useUserData = () => {
  const [user, setUser] = useRecoilState(UserDataState);

  function initUserData(userData: CurrentUserDataType) {
    setUser({
      ...userData,
      id: "test1",
    });
  }

  return {
    user,
    initUserData,
  };
};
