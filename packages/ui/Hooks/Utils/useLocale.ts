import { useRouter } from "next/router";

export const useLocale = () => {
  const router = useRouter();
  const locale = router ? router.locale : undefined;

  return {
    locale,
  };
};
