import { useMutation, useQuery } from "@apollo/client";
import AddBoxIconOutlined from "@mui/icons-material/AddBox";
import DeleteIconOutlined from "@mui/icons-material/Delete";
import EditIconOutlined from "@mui/icons-material/Edit";
import { Box, Button } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import * as Yup from "yup";
import DataGrid from "../../components/Datagrid";
import { FFDateField, FFTextField } from "../../components/DemoFastField";
import FormDrawer from "../../components/FormDrawer";
import Tabs from "../../components/Tabs";
import {
  ADD_DIPENDENTE_NESTED,
  DELETE_DIPENDENTE,
  GET_ALL_DIPENDENTI,
  UPDATE_DIPENDENTE_TX,
} from "../../gql/queries";
import {
  columns,
  initialAnagraficaValues,
  initialContrattoValues,
  initialCorsoValues,
  initialGestioneOperativaValues,
} from "./type";
import ConfirmDialog from "../../components/ConfirmDialog";

const validationSchema = Yup.object({
  anagrafica: Yup.object({
    nome: Yup.string().trim().required("Nome obbligatorio"),
    cognome: Yup.string().trim().required("Cognome obbligatorio"),
    codice_fiscale: Yup.string()
      .trim()
      .nullable()
      .test("cf", "Codice fiscale non valido", (v) => {
        if (!v) return true;
        return /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i.test(v);
      }),
    telefono: Yup.string()
      .trim()
      .required("Telefono obbligatorio")
      .matches(/^[+]?[\d\s().-]{6,20}$/, "Telefono non valido"),

    email: Yup.string()
      .trim()
      .required("Email obbligatoria")
      .email("Email non valida"),
    indirizzo: Yup.string().trim().required("Indirizzo obbligatorio"),
    data_nascita: Yup.string().trim().required("Data di nascita obbligatoria"),
  }),
  contratto: Yup.object({
    data_inizio: Yup.string().trim().required("Data inizio obbligatorio"),
    ruolo: Yup.string().trim().required("Ruolo obbligatorio"),
  }),
});

export default function GestioneDipendente() {
  const [open, setOpen] = useState(false);
  const [editRow, setEditingRow] = useState<any>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<any>(null);
  const title = useMemo(() => {
    if (!editRow) {
      return "Inserimento dipendente";
    } else {
      return "Modifica dipendente";
    }
  }, [editRow]);

  //GraphQL API
  const { data } = useQuery(GET_ALL_DIPENDENTI);

  const [deleteDipendente] = useMutation(DELETE_DIPENDENTE, {
    refetchQueries: [GET_ALL_DIPENDENTI],
    awaitRefetchQueries: true,
  });

  const [addDipendenteNested] = useMutation(ADD_DIPENDENTE_NESTED, {
    refetchQueries: [GET_ALL_DIPENDENTI],
    awaitRefetchQueries: true,
  });

  const [updateDipendenteNested] = useMutation(UPDATE_DIPENDENTE_TX, {
    refetchQueries: [GET_ALL_DIPENDENTI],
    awaitRefetchQueries: true,
  });

  const memoizedRows = useMemo(
    () => data?.dipendente ?? [],
    [data?.dipendente]
  );

  //Dichiarazione form
  const formik = useFormik({
    initialValues: {
      anagrafica: editRow ?? initialAnagraficaValues,
      contratto: editRow?.contratto?.[0] ?? initialContrattoValues,
      gestioneOperativa:
        editRow?.assegnazione_corso?.[0] ?? initialGestioneOperativaValues,
      corso: editRow?.assegnazione_corso?.[0].corso ?? initialCorsoValues,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, helpers) => {
      try {
        const corsoId = values.corso.id_corso; // <-- da query: corso { id_corso ... }

        if (!editRow) {
          // CREATE (la tua insert nested va bene)
          await addDipendenteNested({
            variables: {
              object: {
                ...values.anagrafica,
                contratto: { data: [{ ...values.contratto }] },
                assegnazione_corso: {
                  data: [
                    {
                      ...values.gestioneOperativa,
                      corso: {
                        data: {
                          nome_corso: values.corso.nome_corso,
                          durata: Number(values.corso.durata ?? 0),
                        },
                      },
                    },
                  ],
                },
              },
            },
          });
        } else {
          // UPDATE (transazione unica)
          await updateDipendenteNested({
            variables: {
              id_dipendente: values.anagrafica.id_dipendente,
              dip_set: {
                nome: values.anagrafica.nome,
                cognome: values.anagrafica.cognome,
                telefono: values.anagrafica.telefono,
                email: values.anagrafica.email,
                indirizzo: values.anagrafica.indirizzo,
                data_nascita: values.anagrafica.data_nascita,
                codice_fiscale: values.anagrafica.codice_fiscale,
                iban: values.anagrafica.iban ?? null,
              },

              id_contratto: values.contratto.id_contratto,
              contr_set: {
                ruolo: values.contratto.ruolo,
                tipo_contratto: values.contratto.tipo_contratto,
                data_inizio: values.contratto.data_inizio,
                data_fine: values.contratto.data_fine,
                ore_settimanali: Number(values.contratto.ore_settimanali ?? 0),
                compenso: values.contratto.compenso,
              },

              corso_id: corsoId,
              ass_set: {
                giorni: values.gestioneOperativa.giorni,
                orari: values.gestioneOperativa.orari,
                numero_iscritti: Number(
                  values.gestioneOperativa.numero_iscritti ?? 0
                ),
                ore_assenza: Number(values.gestioneOperativa.ore_assenza ?? 0),
              },

              corso_set: {
                nome_corso: values.corso.nome_corso,
                durata: Number(values.corso.durata ?? 0),
              },
            },
          });
        }

        helpers.resetForm();
        setOpen(false);
      } catch (e) {
        console.error(e);
      }
    },
  });

  //La funzione viene ridichiarata ogni qual volta viene selezionato un nuovo valore in editRow
  const onEdit = useCallback(
    (row: any) => {
      setEditingRow(row);
      setOpen(true);
    },
    [editRow]
  );

  //La funzione viene ridichiarata ogni qual volta viene chiamato l'hook "funzione" deleteDipendente
  const onDelete = useCallback(
    (row: any) => {
      setRowToDelete(row);
      setModalOpen(true);
    },
    [rowToDelete]
  );

  const onClose = useCallback(() => {
    setOpen(false);
    setEditingRow(undefined);
    formik.resetForm();
  }, []);

  const onConfirmDelete = useCallback(async () => {
    if (!rowToDelete) return;

    await deleteDipendente({
      variables: { id_dipendente: rowToDelete.id_dipendente },
    });

    setModalOpen(false);
    setRowToDelete(null);
  }, [deleteDipendente, rowToDelete]);

  //La constante viene ricomputata ogni qual volta vengono chiamati onEdit e onDelete
  const actions = useMemo(
    () => [
      {
        icon: <EditIconOutlined />,
        color: "primary",
        onClick: onEdit,
      },
      {
        icon: <DeleteIconOutlined />,
        color: "error",
        onClick: onDelete,
      },
    ],
    [onEdit, onDelete]
  );

  //TODO - Manage of ri-rendering
  const tabs = [
    {
      label: "Anagrafica",
      value: "1",
      content: (
        <>
          <FFTextField
            name="anagrafica.nome"
            label="Nome"
            size="small"
            fullWidth
          />
          <FFTextField
            name="anagrafica.cognome"
            label="Cognome"
            size="small"
            fullWidth
          />
          <FFTextField
            name="anagrafica.codice_fiscale"
            label="Codice fiscale"
            size="small"
            fullWidth
          />
          <FFTextField
            name="anagrafica.telefono"
            label="Telefono"
            size="small"
            fullWidth
          />
          <FFTextField
            name="anagrafica.email"
            label="Email"
            type="email"
            size="small"
            fullWidth
          />
          <FFTextField
            name="anagrafica.indirizzo"
            label="Indirizzo"
            size="small"
            fullWidth
          />
          <FFTextField
            name="anagrafica.iban"
            label="Iban"
            size="small"
            fullWidth
          />
          <FFDateField
            name="anagrafica.data_nascita"
            label="Data di nascita"
            size="small"
            fullWidth
            format="DD/MM/YYYY"
          />
        </>
      ),
    },
    {
      label: "Contratto",
      value: "2",
      content: (
        <>
          <FFTextField
            name="contratto.ruolo"
            label="Ruolo"
            size="small"
            fullWidth
          />
          <FFTextField
            name="contratto.tipo_contratto"
            label="Tipo Contratto"
            size="small"
            fullWidth
          />
          <FFDateField
            name="contratto.data_inizio"
            label="Data inizio"
            size="small"
            fullWidth
          />
          <FFDateField
            name="contratto.data_fine"
            label="Data fine"
            size="small"
            fullWidth
          />
          <FFTextField
            name="contratto.compenso"
            label="Compenso"
            size="small"
            fullWidth
            type="number"
          />
          <FFTextField
            name="contratto.ore_settimanali"
            label="Ore settimanali"
            size="small"
            fullWidth
            type="number"
          />
        </>
      ),
    },
    {
      label: "Gestione operativa",
      value: "3",
      content: (
        <>
          <FFTextField
            name="gestioneOperativa.giorni"
            label="Giorni"
            size="small"
            fullWidth
          />
          <FFTextField
            name="gestioneOperativa.orari"
            label="Orari"
            size="small"
            fullWidth
          />
          <FFTextField
            name="gestioneOperativa.numero_iscritti"
            label="Numero iscritti"
            size="small"
            fullWidth
            type="number"
          />
          <FFTextField
            name="gestioneOperativa.ore_assenza"
            label="Ore assenza"
            size="small"
            fullWidth
            type="number"
          />
          <FFTextField
            name="corso.nome_corso"
            label="Nome corso"
            size="small"
            fullWidth
          />
          <FFTextField
            name="corso.durata"
            label="Durata"
            size="small"
            fullWidth
            type="number"
          />
        </>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ConfirmDialog
        title="Conferma eliminazione"
        description="Sei sicuro di voler proseguire con l'eliminazione?"
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}
        handleConfirm={onConfirmDelete}
      ></ConfirmDialog>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => {
            setEditingRow(undefined);
            setOpen(true);
          }}
        >
          <AddBoxIconOutlined /> CREA
        </Button>
      </Box>
      <FormikProvider value={formik}>
        <FormDrawer
          title={title}
          open={open}
          anchor="right"
          variant="temporary"
          handleClose={() => setOpen(false)}
          sx={{ padding: "32px 16px", display: "flex", flex: 1 }}
          paperWidth={450}
        >
          <Form
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <Tabs tabs={tabs} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "auto",
              }}
            >
              <Button variant="contained" onClick={onClose}>
                Indietro
              </Button>
              <Button
                variant="contained"
                onClick={() => formik.handleSubmit()}
                disabled={formik.isSubmitting}
              >
                Salva
              </Button>
            </Box>
          </Form>
        </FormDrawer>
      </FormikProvider>
      <Box sx={{ marginTop: "10px" }}>
        <DataGrid
          keyRowId="id_dipendente"
          rows={memoizedRows}
          columns={columns}
          actions={actions}
        ></DataGrid>
      </Box>
    </Box>
  );
}
