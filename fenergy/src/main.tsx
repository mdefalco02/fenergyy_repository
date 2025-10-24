import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NhostProvider } from '@nhost/react'
import nhost from '../config/nhostClient.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/dashboard.tsx'

import DashboardPage from './pages';
import OrdersPage from './pages/orders';

//...
const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
          {
            path: 'orders',
            Component: OrdersPage,
          },
        ],
      },
    ],
  },
]);
//...



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
      <RouterProvider router={router} />
    </NhostProvider>
  </StrictMode>,
)
