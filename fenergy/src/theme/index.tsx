import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: { light: true, dark: true },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: "Poppins, sans-serif",
          backgroundColor: theme.palette.mode !== "dark" ? "#fff" : "#000",
          color: theme.palette.mode !== "dark" ? "#fff" : "#0000",
          "& .MuiToolbar-root": {
            backgroundColor:
              theme.palette.mode !== "dark" ? "#fff" : "#000 !important",
            color: theme.palette.mode !== "dark" ? "#fff" : "#000",
          },
        }),
      },
    },
  },
});
