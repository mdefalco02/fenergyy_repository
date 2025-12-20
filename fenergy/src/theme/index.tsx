import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

//TODO - Inserimento della palette di colori sia per la modalità light sia per la dark.
//Implementare logica per lo switch del tema dentro l'applicazione
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
          backgroundColor: "#fff",
          color: "black",
          "& .MuiToolbar-root": {
            backgroundColor:
              theme.palette.mode !== "dark" ? "#fff" : "#000 !important",
            color: theme.palette.mode !== "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#fff",
            color: "black",
          },
          "& .MuiTablePagination-displayedRows": {
            backgroundColor: "#fff",
            color: "black",
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiToolbar-root": {
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            color: "black",
          },
        }),
      },
    },
  },
});
