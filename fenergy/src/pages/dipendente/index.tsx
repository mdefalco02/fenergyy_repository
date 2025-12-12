import {
  ApolloCache,
  useMutation,
  useQuery,
  type DefaultContext,
  type FetchResult,
  type MutationFunctionOptions,
  type OperationVariables,
} from "@apollo/client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, TextField } from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useMemo, useState } from "react";
import DataGrid from "../../components/Datagrid";
import CustomDrawer from "../../components/Drawer";
import Tabs from "../../components/Tabs";
import {
  ADD_PERSONA_ONE,
  DELETE_PERSONA,
  GET_ALL_PERSONE,
  UPDATE_PERSONA_ONE,
} from "../../gql/queries";

const columns: GridColDef[] = [
  { field: "nome", headerName: "Nome", flex: 1, headerAlign: "center" },
  {
    field: "cognome",
    headerName: "Cognome",
    flex: 1,
    headerAlign: "center",
  },

  {
    field: "codiceFiscale",
    headerName: "Codice Fiscale",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "telefono",
    headerName: "Telefono",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "indirizzo",
    headerName: "Indirizzo",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerAlign: "center",
  },
];

export interface PersonaProps {
  id_dipendente?: string;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  telefono: string;
  email: string;
  indirizzo: string;
}
const initialValues: PersonaProps = {
  id_dipendente: "",
  nome: "",
  cognome: "",
  codiceFiscale: "",
  telefono: "",
  email: "",
  indirizzo: "",
};

interface FormDipendenteProps {
  addDipendente: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<FetchResult<any>>;
  editRow: any;
  handleClose: any;
  setEditingRow: any;
  updatePersona: any;
}

function FormDipendente({
  addDipendente,
  editRow,
  setEditingRow,
  handleClose,
  updatePersona,
}: FormDipendenteProps) {
  const formik = useFormik({
    initialValues: editRow ?? initialValues,
    enableReinitialize: true,
    onSubmit: async (element, helpers) => {
      try {
        //controllo che la variabile di stato "oggetto" editRow abbia una length maggiore di 1
        // se sì procedo con il fare update sennò insert
        if (Object.keys(editRow).length > 0) {
          const res = await updatePersona({
            variables: {
              id_dipendente: element.id_dipendente,
              nome: element.nome,
              cognome: element.cognome,
              codiceFiscale: element.codiceFiscale,
              telefono: element.telefono,
              email: element.email,
              indirizzo: element.indirizzo,
            },
          });
          console.log("res", res);
          if (res.data.update_persona_by_pk) {
            helpers.resetForm();
            handleClose(); // 👈 chiudiamo il drawer
          }
        } else {
          const res = await addDipendente({
            variables: {
              nome: element.nome,
              cognome: element.cognome,
              codiceFiscale: element.codiceFiscale,
              telefono: element.telefono,
              email: element.email,
              indirizzo: element.indirizzo,
            },
          });
          if (res.data?.insert_persona_one) {
            helpers.resetForm();
            handleClose(); // 👈 chiudiamo il drawer
          }
        }
      } catch (err) {
        console.error("Errore nella mutation addPersonaOne", err);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: "10px",
          }}
        >
          <Field
            as={TextField}
            name="nome"
            label="Nome"
            size="small"
            fullWidth
          />
          <Field
            as={TextField}
            name="cognome"
            label="Cognome"
            size="small"
            fullWidth
          />

          <Field
            as={TextField}
            name="codiceFiscale"
            label="Codice fiscale"
            size="small"
            fullWidth
          />

          <Field
            as={TextField}
            name="telefono"
            label="Telefono"
            size="small"
            fullWidth
          />

          <Field
            as={TextField}
            name="email"
            label="Email"
            type="email"
            size="small"
            fullWidth
          />

          <Field
            as={TextField}
            name="indirizzo"
            label="Indirizzo"
            size="small"
            fullWidth
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" onClick={() => handleClose()}>
              Indietro
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => formik.handleSubmit()}
              disabled={formik.isSubmitting}
            >
              Salva
            </Button>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
}

function FormASD({
  addDipendente,
  editRow,
  setEditingRow,
  handleClose,
  updatePersona,
}: FormDipendenteProps) {
  const formik = useFormik({
    initialValues: editRow ?? initialValues,
    enableReinitialize: true,
    onSubmit: async (element, helpers) => {
      try {
        //controllo che la variabile di stato "oggetto" editRow abbia una length maggiore di 1
        // se sì procedo con il fare update sennò insert
        if (editRow) {
          const res = await updatePersona({
            variables: {
              id_dipendente: element.id_dipendente,
              nome: element.nome,
              cognome: element.cognome,
              codiceFiscale: element.codiceFiscale,
              telefono: element.telefono,
              email: element.email,
              indirizzo: element.indirizzo,
            },
          });
          console.log("res", res);
          if (res.data.update_persona_by_pk) {
            helpers.resetForm();
            handleClose(); // 👈 chiudiamo il drawer
          }
        } else {
          const res = await addDipendente({
            variables: {
              nome: element.nome,
              cognome: element.cognome,
              codiceFiscale: element.codiceFiscale,
              telefono: element.telefono,
              email: element.email,
              indirizzo: element.indirizzo,
            },
          });
          if (res.data?.insert_persona_one) {
            helpers.resetForm();
            handleClose(); // 👈 chiudiamo il drawer
          }
        }
      } catch (err) {
        console.error("Errore nella mutation addPersonaOne", err);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: "10px",
          }}
        >
          <Field
            as={TextField}
            name="nome"
            label="Nome"
            size="small"
            fullWidth
          />
          <Field
            as={TextField}
            name="cognome"
            label="Cognome"
            size="small"
            fullWidth
          />

          <Field
            as={TextField}
            name="codiceFiscale"
            label="Codice fiscale"
            size="small"
            fullWidth
          />

          <Field
            as={TextField}
            name="telefono"
            label="Telefono"
            size="small"
            fullWidth
          />

          <Field
            as={TextField}
            name="email"
            label="Email"
            type="email"
            size="small"
            fullWidth
          />

          <Field
            as={TextField}
            name="indirizzo"
            label="Indirizzo"
            size="small"
            fullWidth
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" onClick={() => handleClose()}>
              Indietro
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => formik.handleSubmit()}
              disabled={formik.isSubmitting}
            >
              Salva
            </Button>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
}

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

  console.log("rows", memoizedRows);

  const actions = [
    {
      icon: <EditIcon />,
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
      icon: <DeleteIcon />,
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
          <AddBoxIcon></AddBoxIcon> CREA
        </Button>
      </Box>
      <CustomDrawer
        title={"Aggiunta dipendente"}
        open={open}
        handleClose={() => setOpen(false)}
      >
        <Tabs tabs={tabs} />
      </CustomDrawer>
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
