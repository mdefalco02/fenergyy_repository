import { gql } from "@apollo/client";

export const GET_ALL_PERSONE = gql`
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

export const ADD_PERSONA_ONE = gql`
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

export const DELETE_PERSONA = gql`
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

export const UPDATE_PERSONA_ONE = gql`
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
