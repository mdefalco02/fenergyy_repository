import { createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import { THEME } from "./theme";

export default function App() {
  const theme = createTheme(THEME);
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
}
