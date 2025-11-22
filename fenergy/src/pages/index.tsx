import { Button } from "@mui/material";
import DataGridDemo from "../components/DataGrid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useCallback, useState } from "react";
import PersistentDrawerRight, { type Persona } from "../components/Drawer";
import nhost from "../../config/nhostClient";

// interface getPersonas {
//   data: Persona[];
// }
export default function DashboardPage() {
  const [open, setOpen] = React.useState(false);

  const [data, setData] = useState<any>([]);
  console.log("data", data);
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
    console.log("OOOO", response);
    // Extract todos from the GraphQL response data
    setData(response.data.persona);
  }, [nhost.graphql]);

  fetchTodos();

  return (
    <>
      <PersistentDrawerRight
        open={open}
        handleClose={() => setOpen(false)}
        setData={setData}
      ></PersistentDrawerRight>
      <Button
        variant="outlined"
        onClick={(row) => {
          console.log("ho cliccato");
          setOpen(true);
        }}
      >
        <AddBoxIcon></AddBoxIcon> CREAS
      </Button>
      <DataGridDemo rows={data}></DataGridDemo>
    </>
  );
}
