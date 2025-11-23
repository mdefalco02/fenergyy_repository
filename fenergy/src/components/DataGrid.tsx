import { IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { memo, useMemo, type JSX } from "react";

interface ActionButton {
  icon: JSX.Element;
  color: string;
  onClick: any;
}

type ActionsButton = ActionButton[];

interface DatagridProps {
  rows: any;
  columns: GridColDef[];
  actions?: any;
}
export default memo(function DataGridDemo({
  rows,
  columns,
  actions,
}: DatagridProps) {
  const columnsWithActions = useMemo(() => {
    if (!actions || actions.length === 0) return columns;

    const actionColumn: GridColDef = {
      field: "__actions",
      headerName: "Azioni",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          {actions.map((action: any, index: any) => (
            <IconButton
              key={index}
              size="small"
              color={action.color ?? "primary"}
              onClick={() => action.onClick(params.row)}
            >
              {action.icon}
            </IconButton>
          ))}
        </Stack>
      ),
    };

    return [...columns, actionColumn];
  }, [columns, actions]);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columnsWithActions}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowId={(rows) => rows.id_dipendente}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
});
