import { Button } from "@mui/material";
import DataGridDemo from "../components/DataGrid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useCallback, useEffect, useState } from "react";
import PersistentDrawerRight, { type Persona } from "../components/Drawer";
import nhost from "../../config/nhostClient";

// interface getPersonas {
//   data: Persona[];
// }

interface addPersonaOne {
  insert_persona_one: Persona;
}
export default function DashboardPage() {
  const [open, setOpen] = React.useState(false);

  const [data, setData] = useState<any>([]);
  const fetchTodos = useCallback(async () => {
    // Make GraphQL request to fetch todos using Nhost client
    // The query automatically filters by user_id due to Hasura permissions
    const response = await nhost.graphql.request<any>({
      document: `
          query GetPersonas {
            persona {
              id_dipendente
              nome
              cognome
              indirizzo
              telefono
              email
              codiceFiscale
            }
          }
        `,
    });
    // Extract todos from the GraphQL response data
    setData(response.data.persona);
  }, [nhost.graphql]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const addPersona = useCallback(
    async (values: any) => {
      const response = await nhost.graphql.request<addPersonaOne>({
        document: `
          mutation AddPersonaOne($nome: String, $cognome: String, $codiceFiscale: String, $telefono: String, $email: String, $indirizzo: String) {
            insert_persona_one(object: { nome: $nome, cognome: $cognome,codiceFiscale: $codiceFiscale,telefono: $telefono,email: $email,indirizzo: $indirizzo }) {
              nome
              cognome
              codiceFiscale
              telefono
              email
              indirizzo
            }
          } 
        `,
        variables: {
          nome: values.nome,
          cognome: values.cognome,
          codiceFiscale: values.codiceFiscale,
          telefono: values.telefono,
          email: values.email,
          indirizzo: values.indirizzo,
        },
      });
      console.log("ooo", values, response);
    },
    [nhost.graphql]
  );

  return (
    <>
      <PersistentDrawerRight
        open={open}
        handleClose={() => setOpen(false)}
        setData={setData}
        addPersona={addPersona}
      ></PersistentDrawerRight>
      <Button
        variant="outlined"
        onClick={(row) => {
          setOpen(true);
        }}
      >
        <AddBoxIcon></AddBoxIcon> CREAS
      </Button>
      <DataGridDemo rows={data}></DataGridDemo>
    </>
  );
}
