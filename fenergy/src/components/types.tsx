import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import type { DrawerProps, ModalProps } from "@mui/material";

//Navigation items props
export interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

//FormDrawer properties
export interface FormDrawerProps extends DrawerProps {
  // Titolo del drawer
  title?: string;
  // true = aperto, false = chiuso
  open: boolean;
  // funzione che chiude il drawer
  handleClose: () => void;
  children?: React.ReactNode;
  paperWidth?: number;
}

//SidenavDrawer properties
export interface SidenavDrawerProps extends DrawerProps {
  handleClose: () => void;
  open: boolean;
  logo: string;
  children: React.ReactNode;
}

export const drawerWidth = 320;
export const collapsedWidth = 0;

export const navItems: NavItem[] = [
  {
    icon: <Diversity3Icon></Diversity3Icon>,
    label: "Clienti",
    to: "clienti",
  },
  {
    icon: <FitnessCenterIcon></FitnessCenterIcon>,
    label: "Schede",
    to: "schede",
  },
  {
    icon: <CurrencyExchangeIcon></CurrencyExchangeIcon>,
    label: "Finanza",
    to: "finance",
  },
  {
    icon: <GroupsOutlinedIcon></GroupsOutlinedIcon>,
    label: "Dipendenti",
    to: "dipendenti",
  },
  {
    icon: <FolderOutlinedIcon></FolderOutlinedIcon>,
    label: "Archivio multimediale",
    to: "archivio",
  },
];

export interface ConfirmModalProps {
  title: string;
  description: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: any;
}
