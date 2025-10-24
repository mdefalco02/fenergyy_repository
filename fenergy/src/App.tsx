import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import type { Navigation } from '@toolpad/core';
import { createTheme, ThemeProvider } from '@mui/material';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
];

const BRANDING = {
  title: 'Fenergy',   
  logo : <img src="/images/fenergy-logo-removebg-preview.png"/>
};

export default function App() {
  const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0b1220' },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#112A46',   // ← background sidenav
          color: '#E6EDF5',              // testo
        },
      },
    },
  },
})
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING} >
      <ThemeProvider theme={theme}>
      <Outlet />
      </ThemeProvider>
    </ReactRouterAppProvider>
  );
}
