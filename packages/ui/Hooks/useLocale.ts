import { useRouter } from "next/router";

export const useLocale = () => {
  const router = useRouter();
  const locale = router.locale;

  return {
    locale,
  };
};
