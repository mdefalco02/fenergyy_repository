import { createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";

export default function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      background: { default: "#0b1220" },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#112A46", // ← background sidenav
            color: "#E6EDF5", // testo
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
}
