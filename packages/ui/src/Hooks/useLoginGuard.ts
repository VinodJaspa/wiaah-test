// hooks/useLoginGuard.ts
import { useRouter } from "next/router";
import { useLoginPopup } from "./useLoginPopup"; // your recoil hook
import { useRecoilValue } from "recoil";
import { isUserLoggedIn } from "state";
// adjust path

export const useLoginGuard = () => {
    const userLoggedIn = useRecoilValue(isUserLoggedIn);
    const { OpenLoginPopup } = useLoginPopup();
    const router = useRouter();
console.log(userLoggedIn,"isUserLoggedIn");

    const withLoginCheck = (action?: () => void) => {
        return (e?: React.MouseEvent) => {
            e?.stopPropagation?.();
            if (!userLoggedIn) {
                OpenLoginPopup();
                return;
            }
            if (action) {
                action();
            }
        };
    };

    return { withLoginCheck, userLoggedIn, router };
};
