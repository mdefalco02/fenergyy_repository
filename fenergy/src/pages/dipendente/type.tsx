import type {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import { type GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
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

export const initialValues: PersonaProps = {
  id_dipendente: "",
  nome: "",
  cognome: "",
  codiceFiscale: "",
  telefono: "",
  email: "",
  indirizzo: "",
};

export interface FormDipendenteProps {
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
