import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import nhost from "../config/nhostClient.tsx";
import App from "./App.tsx";
import "./index.css";
import Layout from "./layouts/dashboard.tsx";

import { NhostApolloProvider } from "@nhost/react-apollo";
import DashboardPage from "./pages";

//...
const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "",
            Component: DashboardPage,
          },
        ],
      },
    ],
  },
]);
//...

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NhostApolloProvider nhost={nhost}>
      <RouterProvider router={router} />
    </NhostApolloProvider>
  </StrictMode>
);
