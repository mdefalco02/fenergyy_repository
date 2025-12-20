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
    field: "codice_fiscale",
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
  {
    field: "data_nascita",
    headerName: "Data di nascita",
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "iban",
    headerName: "Iban",
    flex: 1,
    headerAlign: "center",
  },
];

export interface DipendenteProps {
  id_dipendente?: string;
  nome: string;
  cognome: string;
  codice_fiscale: string;
  telefono: string;
  email: string;
  indirizzo: string;
  data_nascita: string;
  iban: string;
}

export const initialValues: DipendenteProps = {
  id_dipendente: "",
  nome: "",
  cognome: "",
  codice_fiscale: "",
  telefono: "",
  email: "",
  indirizzo: "",
  data_nascita: "",
  iban: "",
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
