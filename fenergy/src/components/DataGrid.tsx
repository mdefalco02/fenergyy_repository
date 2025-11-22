import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "nome",
    headerName: "Nome",
    width: 150,
    editable: true,
  },
  {
    field: "cognome",
    headerName: "Cognome",
    width: 150,
    editable: true,
  },
  {
    field: "codiceFiscale",
    headerName: "Codice Fiscale",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "telefono",
    headerName: "Telefono",
    sortable: false,
    width: 160,
  },
  {
    field: "email",
    headerName: "email",
    sortable: false,
    width: 160,
  },

  {
    field: "indirizzo",
    headerName: "Indirizzo",
    sortable: false,
    width: 160,
  },
];

interface DataGridProps {
  rows: any[];
}
export default function DataGridDemo({ rows }: DataGridProps) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.id_dipendente}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
