import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./pages/layout/dashboard";
import { theme } from "./theme";

export default function App() {
  return (
    //TO-DO Add dark theme
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout></Layout>
    </ThemeProvider>
  );
}
