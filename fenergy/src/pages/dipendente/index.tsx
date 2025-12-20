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
  ADD_PERSONA_ONE,
  DELETE_PERSONA,
  GET_ALL_PERSONE,
  UPDATE_PERSONA_ONE,
} from "../../gql/queries";
import FormDipendente from "./TabForm";
import { columns, type PersonaProps } from "./type";

export default function GestioneDipendente() {
  const { data } = useQuery(GET_ALL_PERSONE);
  const [deletePersona] = useMutation(DELETE_PERSONA, {
    refetchQueries: [GET_ALL_PERSONE],
    awaitRefetchQueries: true,
  });
  const [editRow, setEditingRow] = useState({});
  const [open, setOpen] = useState(false);
  const [updatePersona] = useMutation(UPDATE_PERSONA_ONE, {
    refetchQueries: [GET_ALL_PERSONE],
    awaitRefetchQueries: true,
  });
  const memoizedRows = useMemo(() => data?.persona ?? [], [data?.persona]);

  const actions = [
    {
      icon: <EditIconOutlined />,
      color: "primary" as const,
      onClick: (row: any) => {
        const persona: PersonaProps = {
          id_dipendente: row.id_dipendente,
          nome: row.nome,
          cognome: row.cognome,
          codiceFiscale: row.codiceFiscale,
          telefono: row.telefono,
          email: row.email,
          indirizzo: row.indirizzo,
        };
        setEditingRow(persona);
        setOpen(true);
      },
    },
    {
      icon: <DeleteIconOutlined />,
      color: "error" as const,
      onClick: async (row: any) => {
        console.log("DELETE riga:", row);
        await deletePersona({ variables: { id: row.id_dipendente } });
      },
    },
  ];

  const [addDipendente] = useMutation(ADD_PERSONA_ONE, {
    refetchQueries: [{ query: GET_ALL_PERSONE }],
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
