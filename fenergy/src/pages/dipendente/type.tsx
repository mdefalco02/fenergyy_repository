import type {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import { type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const columns: GridColDef[] = [
  { field: "nome", headerName: "Nome", flex: 1, headerAlign: "center" },
  { field: "cognome", headerName: "Cognome", flex: 1, headerAlign: "center" },

  {
    field: "ruolo",
    headerName: "Ruolo",
    flex: 1,
    headerAlign: "center",
    valueGetter: (_value, row: any) => row?.contratto?.[0]?.ruolo ?? "",
  },
  {
    field: "data_inizio",
    headerName: "Data Inizio",
    flex: 1,
    headerAlign: "center",
    valueGetter: (_value, row: any) => {
      row?.contratto?.[0]?.data_inizio ?? null;
    },
    valueFormatter: (_value, row: any) => {
      return row?.contratto?.[0].data_inizio
        ? dayjs(row?.contratto?.[0].data_inizio).format("DD/MM/YYYY")
        : "";
    },
  },
  {
    field: "ore_settimanali",
    headerName: "Ore settimanali",
    flex: 1,
    headerAlign: "center",
    valueGetter: (_value, row: any) =>
      row?.contratto?.[0]?.ore_settimanali ?? "",
  },
  {
    field: "ore_assenze",
    headerName: "Ore assenze",
    flex: 1,
    headerAlign: "center",
    valueGetter: (_value, row: any) =>
      row?.assegnazione_corso?.[0]?.ore_assenza ?? "",
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
  iban: string | null;
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
  iban: null,
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
