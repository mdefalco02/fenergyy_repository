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

export interface AnagraficaProps {
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

export interface ContrattoProps {
  dipendente_id?: string;
  id_contratto?: string;
  ruolo: string;
  tipo_contratto: string;
  data_inizio: string;
  data_fine: string;
  compenso: number;
  ore_settimanali: number;
}

export interface GestioneOperativaProps {
  dipendente_id?: string;
  corso_id?: string;
  giorni: string;
  orari: string;
  numero_iscritti: number;
  ore_assenza: number;
}
export interface CorsoProps {
  corso_id?: string;
  nome_corso: string;
  // ???
  durata: number;
}

export const initialContrattoValues: ContrattoProps = {
  data_inizio: "",
  id_contratto: undefined,
  ruolo: "",
  tipo_contratto: "",
  data_fine: "",
  compenso: 0,
  ore_settimanali: 0,
};

export const initialGestioneOperativaValues: GestioneOperativaProps = {
  corso_id: undefined,
  giorni: "",
  orari: "",
  numero_iscritti: 0,
  ore_assenza: 0,
};

export const initialCorsoValues: CorsoProps = {
  corso_id: undefined,
  nome_corso: "",
  durata: 0,
};

export const initialAnagraficaValues: AnagraficaProps = {
  id_dipendente: undefined,
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
  add: (
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
  update: any;
}
