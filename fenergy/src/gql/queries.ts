import { gql } from "@apollo/client";

export const GET_ALL_DIPENDENTI = gql`
  query getAllDipendenti {
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
    }
  }
`;

export const ADD_DIPENDENTE_ONE = gql`
  mutation addDipendenteOne(
    $nome: String
    $cognome: String
    $telefono: String!
    $email: String!
    $indirizzo: String!
    $data_nascita: String
    $codice_fiscale: String
    $iban: String!
  ) {
    insert_dipendente_one(
      object: {
        nome: $nome
        cognome: $cognome
        telefono: $telefono
        email: $email
        indirizzo: $indirizzo
        data_nascita: $data_nascita
        codice_fiscale: $codice_fiscale
        iban: $iban
      }
    ) {
      id_dipendente
      nome
      cognome
      telefono
      email
      indirizzo
      data_nascita
      codice_fiscale
      iban
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

export const UPDATE_DIPENDENTE_ONE = gql`
  mutation updateDipendenteOne(
    $id_dipendente: uuid!
    $nome: String
    $cognome: String
    $codice_fiscale: String
    $telefono: String
    $email: String
    $indirizzo: String
    $data_nascita: String
    $iban: String
  ) {
    update_dipendente_by_pk(
      pk_columns: { id_dipendente: $id_dipendente }
      _set: {
        nome: $nome
        cognome: $cognome
        codice_fiscale: $codice_fiscale
        telefono: $telefono
        email: $email
        indirizzo: $indirizzo
        data_nascita: $data_nascita
        iban: $iban
      }
    ) {
      id_dipendente
      nome
      cognome
      codice_fiscale
      telefono
      email
      indirizzo
      data_nascita
      iban
    }
  }
`;
