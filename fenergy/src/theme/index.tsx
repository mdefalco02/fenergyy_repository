import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

export const THEME = {
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
  },
};
