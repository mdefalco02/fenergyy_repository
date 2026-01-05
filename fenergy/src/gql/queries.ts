import { gql } from "@apollo/client";

export const GET_ALL_DIPENDENTI = gql`
  query FindAllDipendentiCompleti {
    dipendente {
      id_dipendente
      nome
      cognome
      codice_fiscale
      telefono
      email
      indirizzo
      data_nascita
      iban

      contratto {
        id_contratto
        ruolo
        tipo_contratto
        data_inizio
        data_fine
        ore_settimanali
        compenso
      }

      assegnazione_corso {
        giorni
        orari
        numero_iscritti
        ore_assenza

        corso {
          id_corso
          nome_corso
          durata
        }
      }
    }
  }
`;

export const DELETE_DIPENDENTE = gql`
  mutation deleteDipendente($id_dipendente: uuid!) {
    delete_dipendente_by_pk(id_dipendente: $id_dipendente) {
      id_dipendente
    }
  }
`;

export const ADD_DIPENDENTE_NESTED = gql`
  mutation AddDipendenteFull($object: dipendente_insert_input!) {
    insert_dipendente_one(object: $object) {
      id_dipendente
      nome
      cognome
      telefono
      email
      indirizzo
      data_nascita
      codice_fiscale
      iban

      contratto {
        id_contratto
        tipo_contratto
        ruolo
        data_inizio
        data_fine
        ore_settimanali
        compenso
      }

      assegnazione_corso {
        dipendente_id
        corso_id
        giorni
        orari
        numero_iscritti
        ore_assenza
        corso {
          id_corso
          nome_corso
          durata
        }
      }
    }
  }
`;

export const UPDATE_DIPENDENTE_TX = gql`
  mutation UpdateDipendenteTx(
    $id_dipendente: uuid!
    $dip_set: dipendente_set_input!
    $id_contratto: uuid!
    $contr_set: contratto_set_input!
    $corso_id: uuid!
    $ass_set: assegnazione_corso_set_input!
    $corso_set: corso_set_input!
  ) {
    update_dipendente_by_pk(
      pk_columns: { id_dipendente: $id_dipendente }
      _set: $dip_set
    ) {
      id_dipendente
    }

    update_contratto_by_pk(
      pk_columns: { id_contratto: $id_contratto }
      _set: $contr_set
    ) {
      id_contratto
    }

    update_assegnazione_corso_by_pk(
      pk_columns: { dipendente_id: $id_dipendente, corso_id: $corso_id }
      _set: $ass_set
    ) {
      dipendente_id
      corso_id
    }

    update_corso_by_pk(pk_columns: { id_corso: $corso_id }, _set: $corso_set) {
      id_corso
    }
  }
`;
