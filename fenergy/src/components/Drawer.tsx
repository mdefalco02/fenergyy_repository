import { Button, TextField } from "@mui/material";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: "relative",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
    },
  ],
}));

export interface Persona {
  id_dipendente: string;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  telefono: string;
  email: string;
  indirizzo: string;
}

const validationSchema = Yup.object({
  nome: Yup.string().required("Obbligatorio"),
  cognome: Yup.string().required("Obbligatorio"),
  codiceFiscale: Yup.string().required("Obbligatorio"),
  telefono: Yup.string(),
  email: Yup.string().email("Email non valida"),
  indirizzo: Yup.string(),
});
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleClose?: () => void;
  setData?: React.Dispatch<React.SetStateAction<any>>;
  addPersona?: any;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),

        marginRight: drawerWidth,
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight({
  open,
  handleClose,
  setData,
  addPersona,
}: AppBarProps) {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}></AppBar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            zIndex: 1300, // 👈 qui il livello effettivo del pannello
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        {" "}
        <Formik
          initialValues={{
            id_dipendente: crypto.randomUUID(),
            nome: "",
            cognome: "",
            codiceFiscale: "",
            telefono: "",
            email: "",
            indirizzo: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("values", values);
            setData?.([values]);
            resetForm();
            handleClose?.();
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Field
                  as={TextField}
                  name="nome"
                  label="Nome"
                  size="small"
                  error={touched.nome && Boolean(errors.nome)}
                  helperText={touched.nome && errors.nome}
                />
                <Field
                  as={TextField}
                  name="cognome"
                  label="Cognome"
                  size="small"
                  error={touched.cognome && Boolean(errors.cognome)}
                  helperText={touched.cognome && errors.cognome}
                />
                <Field
                  as={TextField}
                  name="codiceFiscale"
                  label="Codice Fiscale"
                  size="small"
                  error={touched.codiceFiscale && Boolean(errors.codiceFiscale)}
                  helperText={touched.codiceFiscale && errors.codiceFiscale}
                />
                <Field
                  as={TextField}
                  name="telefono"
                  label="Telefono"
                  size="small"
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  size="small"
                  // error={touched.email && Boolean(errors.email)}
                  // helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  name="indirizzo"
                  label="Indirizzo"
                  size="small"
                />

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 2,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button variant="outlined" onClick={handleClose}>
                    Annulla
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={async () => await addPersona(values)}
                  >
                    Salva
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Drawer>
    </Box>
  );
}
