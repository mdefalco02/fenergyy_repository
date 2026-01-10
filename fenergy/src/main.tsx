import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import nhost from "../config/nhostClient";
import "./index.css";

import { NhostApolloProvider } from "@nhost/react-apollo";
import App from "./App";
import { CircularProgress } from "@mui/material";

// Lazy imports
const Archivio = lazy(() => import("./pages/archivio"));
const Clienti = lazy(() => import("./pages/clienti"));
const GestioneDipendente = lazy(() => import("./pages/dipendente"));
const Finanza = lazy(() => import("./pages/finanza"));
const Schede = lazy(() => import("./pages/schede"));

// Wrapper per evitare di ripetere <Suspense> ovunque
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<CircularProgress size={50}></CircularProgress>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "clienti", element: withSuspense(Clienti) },
      { path: "schede", element: withSuspense(Schede) },
      { path: "finance", element: withSuspense(Finanza) },
      { path: "dipendenti", element: withSuspense(GestioneDipendente) },
      { path: "archivio", element: withSuspense(Archivio) },
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
