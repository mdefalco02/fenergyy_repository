import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { Outlet } from "react-router";
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="light">
      <Outlet />
    </ThemeProvider>
  );
}
