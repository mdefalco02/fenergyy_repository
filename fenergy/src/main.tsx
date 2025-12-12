import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import nhost from "../config/nhostClient.tsx";
import App from "./App.tsx";
import "./index.css";

import { NhostApolloProvider } from "@nhost/react-apollo";
import DashboardPage from "./pages/dipendente/index.tsx";
import Layout from "./pages/layout/dashboard.tsx";
import GestioneDipendente from "./pages/dipendente/index.tsx";
import Schede from "./pages/schede/index.tsx";
import Finanza from "./pages/finanza/index.tsx";
import Clienti from "./pages/clienti/index.tsx";
import Archivio from "./pages/archivio/index.tsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { path: "clienti", Component: Clienti },
          { path: "schede", Component: Schede },
          { path: "finance", Component: Finanza },
          { path: "dipendenti", Component: GestioneDipendente },
          { path: "archivio", Component: Archivio },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NhostApolloProvider nhost={nhost}>
      <RouterProvider router={router} />
    </NhostApolloProvider>
  </StrictMode>
);
