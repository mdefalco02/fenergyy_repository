import { useMutation, useQuery } from "@apollo/client";
import AddBoxIconOutlined from "@mui/icons-material/AddBox";
import DeleteIconOutlined from "@mui/icons-material/Delete";
import EditIconOutlined from "@mui/icons-material/Edit";
import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import DataGrid from "../../components/Datagrid";
import FormDrawer from "../../components/FormDrawer";
import Tabs from "../../components/Tabs";
import {
  ADD_DIPENDENTE_ONE,
  DELETE_DIPENDENTE,
  GET_ALL_DIPENDENTI,
  UPDATE_DIPENDENTE_ONE,
} from "../../gql/queries";
import FormDipendente from "./TabForm";
import { columns, type DipendenteProps } from "./type";

export default function GestioneDipendente() {
  const { data } = useQuery(GET_ALL_DIPENDENTI);
  const [deletePersona] = useMutation(DELETE_DIPENDENTE, {
    refetchQueries: [GET_ALL_DIPENDENTI],
    awaitRefetchQueries: true,
  });
  const [editRow, setEditingRow] = useState({});
  const [open, setOpen] = useState(false);
  const [updatePersona] = useMutation(UPDATE_DIPENDENTE_ONE, {
    refetchQueries: [GET_ALL_DIPENDENTI],
    awaitRefetchQueries: true,
  });
  const memoizedRows = useMemo(
    () => data?.dipendente ?? [],
    [data?.dipendente]
  );

  const actions = [
    {
      icon: <EditIconOutlined />,
      color: "primary" as const,
      onClick: (row: any) => {
        const persona: DipendenteProps = {
          id_dipendente: row.id_dipendente,
          nome: row.nome,
          cognome: row.cognome,
          codice_fiscale: row.codice_fiscale,
          telefono: row.telefono,
          email: row.email,
          indirizzo: row.indirizzo,
          data_nascita: row.data_nascita,
          iban: row.iban,
        };
        setEditingRow(persona);
        setOpen(true);
      },
    },
    {
      icon: <DeleteIconOutlined />,
      color: "error" as const,
      onClick: async (row: any) => {
        console.log("DELETE riga:", row, {
          variables: { id: row.id_dipendente },
        });
        await deletePersona({
          variables: { id_dipendente: row.id_dipendente },
        });
      },
    },
  ];

  const [addDipendente] = useMutation(ADD_DIPENDENTE_ONE, {
    refetchQueries: [{ query: GET_ALL_DIPENDENTI }],
  });

  //TODO - Manage of ri-rendering
  const tabs = [
    {
      label: "Anagrafica",
      content: (
        <FormDipendente
          addDipendente={addDipendente}
          editRow={editRow}
          setEditingRow={setEditingRow}
          updatePersona={updatePersona}
          handleClose={() => setOpen(false)}
        ></FormDipendente>
      ),
      value: "1",
    },
    {
      label: "ASD",
      content: (
        <FormDipendente
          addDipendente={addDipendente}
          editRow={editRow}
          setEditingRow={setEditingRow}
          updatePersona={updatePersona}
          handleClose={() => setOpen(false)}
        ></FormDipendente>
      ),
      value: "2",
    },
    {
      label: "Gestione operativa",
      content: (
        <FormDipendente
          addDipendente={addDipendente}
          editRow={editRow}
          setEditingRow={setEditingRow}
          updatePersona={updatePersona}
          handleClose={() => setOpen(false)}
        ></FormDipendente>
      ),
      value: "3",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => {
            setEditingRow({});
            setOpen(true);
          }}
        >
          <AddBoxIconOutlined /> CREA
        </Button>
      </Box>
      <FormDrawer
        title={"Aggiunta dipendente"}
        open={open}
        anchor="right"
        variant="temporary"
        handleClose={() => setOpen(false)}
        sx={{ padding: "32px 16px" }}
      >
        <Tabs tabs={tabs} />
      </FormDrawer>
      <Box sx={{ marginTop: "10px" }}>
        <DataGrid
          rows={memoizedRows}
          columns={columns}
          actions={actions}
        ></DataGrid>
      </Box>
    </Box>
  );
}
