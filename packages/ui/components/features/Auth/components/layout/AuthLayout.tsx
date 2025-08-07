import { useRouting } from '@UI/../routing';
import { useGetMyAccountQuery } from '@features/Accounts';
import React, { useEffect } from 'react';

const loginPath = '/auth/login';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { push, getCurrentPath, getParam } = useRouting();
  const path = getCurrentPath();

  const { data: account, isLoading, isError } = useGetMyAccountQuery();

  // useEffect(() => {
  //   if (isLoading) return;

  //   const isLoggedIn = account && typeof account.id === 'string';

  //   if (!isLoggedIn) {
  //     if (path !== loginPath) {
  //       push(loginPath);
  //     }
  //   } else {
  //     const redirectParam = getParam('redirect');
  //     if (redirectParam) {
  //       push(redirectParam);
  //     }
  //   }
  // }, [account, isLoading, path, push, getParam]);

  return <>{children}</>;
};
