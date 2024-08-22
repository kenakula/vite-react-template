import { useGetMeQuery } from '@app/store/auth';
import { Header } from '@components/header';
import { Loader } from '@components/loader';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LOGIN_ROUTE } from '@shared/constants';
import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import classes from './private-layout.module.css';

interface IProps {
  redirectPath?: string;
}

export const PrivateLayout: FC<IProps> = ({ redirectPath = LOGIN_ROUTE }) => {
  const { data, isLoading } = useGetMeQuery();
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();

  if (isLoading) return <Loader />;

  if (!data) return <Navigate to={redirectPath} replace state={{ redirectTo: location }} />;

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="sm"
      classNames={{
        header: classes.header
      }}
      className="private-layout"
    >
      <Header isNavOpened={opened} toggleNav={toggle} withNav />
      <AppShell.Navbar withBorder>Navbar</AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
