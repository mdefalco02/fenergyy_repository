import {
  ApolloCache,
  gql,
  useMutation,
  useQuery,
  type DefaultContext,
  type FetchResult,
  type MutationFunctionOptions,
  type MutationResult,
  type OperationVariables,
} from "@apollo/client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, TextField } from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useMemo, useState } from "react";
import DataGrid from "../components/Datagrid";
import CustomDrawer from "../components/Drawer";
const columns: GridColDef[] = [
  { field: "nome", headerName: "Nome", width: 90 },
  {
    field: "cognome",
    headerName: "Cognome",
    width: 150,
  },

  {
    field: "codiceFiscale",
    headerName: "Codice Fiscale",
    width: 150,
  },
  {
    field: "telefono",
    headerName: "Telefono",
    width: 150,
  },
  {
    field: "indirizzo",
    headerName: "Indirizzo",
    width: 110,
  },
  {
    field: "email",
    headerName: "Email",
    width: 160,
  },
];

const GET_ALL_PERSONE = gql`
  query getAllPersone {
    persona {
      id_dipendente
      nome
      cognome
      codiceFiscale
      telefono
      email
      indirizzo
    }
  }
`;

const ADD_PERSONA_ONE = gql`
  mutation addPersonaOne(
    $nome: String!
    $cognome: String!
    $codiceFiscale: String!
    $telefono: String!
    $email: String!
    $indirizzo: String!
  ) {
    insert_persona_one(
      object: {
        nome: $nome
        cognome: $cognome
        codiceFiscale: $codiceFiscale
        telefono: $telefono
        email: $email
        indirizzo: $indirizzo
      }
    ) {
      id_dipendente
      nome
      cognome
      codiceFiscale
      telefono
      email
      indirizzo
    }
  }
`;

const DELETE_PERSONA = gql`
  mutation DeletePersona($id: uuid!) {
    delete_persona_by_pk(id_dipendente: $id) {
      id_dipendente
      nome
      cognome
      codiceFiscale
      telefono
      email
      indirizzo
    }
  }
`;

const UPDATE_PERSONA_ONE = gql`
  mutation UpdatePersonaOne(
    $id_dipendente: uuid!
    $nome: String
    $cognome: String
    $codiceFiscale: String
    $telefono: String
    $email: String
    $indirizzo: String
  ) {
    update_persona_by_pk(
      pk_columns: { id_dipendente: $id_dipendente }
      _set: {
        nome: $nome
        cognome: $cognome
        codiceFiscale: $codiceFiscale
        telefono: $telefono
        email: $email
        indirizzo: $indirizzo
      }
    ) {
      id_dipendente
      nome
      cognome
      codiceFiscale
      telefono
      email
      indirizzo
    }
  }
`;

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
  open: any;
  setOpen: any;
  setEditingRow: any;
  updatePersona: any;
  loadingInsert?: MutationResult<any>;
  loadingUpdate?: MutationResult<any>;
}

function FormDipendente({
  addDipendente,
  editRow,
  setEditingRow,
  open,
  setOpen,
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
            setOpen(false); // 👈 chiudiamo il drawer
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
            setOpen(false); // 👈 chiudiamo il drawer
          }
        }
      } catch (err) {
        console.error("Errore nella mutation addPersonaOne", err);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => {
            setEditingRow(null);
            setOpen(true);
          }}
        >
          <AddBoxIcon></AddBoxIcon> CREA
        </Button>
      </Box>
      <CustomDrawer
        title={"Aggiungi un dipendente"}
        open={open}
        handleClose={() => setOpen(false)}
      >
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

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button variant="contained" onClick={() => setOpen(false)}>
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
      </CustomDrawer>
    </FormikProvider>
  );
}

export default function DashboardPage() {
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormDipendente
        addDipendente={addDipendente}
        editRow={editRow}
        open={open}
        setOpen={setOpen}
        setEditingRow={setEditingRow}
        updatePersona={updatePersona}
      ></FormDipendente>
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
