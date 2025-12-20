import { Box, Button, TextField } from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { initialValues, type FormDipendenteProps } from "./type";

export default function FormDipendente({
  addDipendente,
  editRow,
  setEditingRow,
  handleClose,
  updatePersona,
}: FormDipendenteProps) {
  const formik = useFormik({
    initialValues: editRow ?? initialValues,
    enableReinitialize: true,
    onSubmit: async (element, helpers) => {
      try {
        //controllo che la variabile di stato "oggetto" editRow abbia una length maggiore di 1
        // se sì procedo con il fare update sennò insert
        if (Object.keys(editRow).length > 0) {
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
            handleClose(); // 👈 chiudiamo il drawer
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
            handleClose(); // 👈 chiudiamo il drawer
          }
        }
      } catch (err) {
        console.error("Errore nella mutation addPersonaOne", err);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
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

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" onClick={() => handleClose()}>
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
    </FormikProvider>
  );
}

function FormASD({
  addDipendente,
  editRow,
  setEditingRow,
  handleClose,
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
            handleClose(); // 👈 chiudiamo il drawer
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
            handleClose(); // 👈 chiudiamo il drawer
          }
        }
      } catch (err) {
        console.error("Errore nella mutation addPersonaOne", err);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
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

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" onClick={() => handleClose()}>
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
    </FormikProvider>
  );
}
