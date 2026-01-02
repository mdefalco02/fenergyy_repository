import { IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  type DataGridProps,
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

interface DatagridProps extends DataGridProps {
  rows: any;
  columns: GridColDef[];
  actions?: ActionsButton;
  keyRowId: string | number;
  // rowId: string | number;
}
export default memo(function DataGridDemo({
  rows,
  columns,
  actions,
  keyRowId,
}: DatagridProps) {
  console.log("str with ");
  const columnsWithActions = useMemo(() => {
    if (!actions || actions.length === 0) return columns;

    const actionColumn: GridColDef = {
      field: "__actions",
      headerName: "Azioni",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ width: "100%", height: "100%" }}
        >
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
    <Box sx={{ width: "100%", height: "100%" }}>
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
        sx={{
          width: "100%",
          height: "100%",
          "& .MuiDataGrid-cell": {
            textAlign: "center",
          },
        }}
        getRowId={(row) => row[keyRowId]}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        disableRowSelectionOnClick
      />
    </Box>
  );
});
