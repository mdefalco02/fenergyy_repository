import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined"; // FINANZA (come screenshot)
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import CustomDrawer from "../../components/Drawer";
import type { NavItem } from "../../types";
import logo from "/images/fenergy-logo.png";

import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const drawerWidth = 320;

const navItems: NavItem[] = [
  {
    icon: <GroupsOutlinedIcon></GroupsOutlinedIcon>,
    label: "Clienti",
    to: "clienti",
  },
  {
    icon: <HandymanOutlinedIcon></HandymanOutlinedIcon>,
    label: "Schede",
    to: "schede",
  },
  {
    icon: <FilterNoneOutlinedIcon></FilterNoneOutlinedIcon>,
    label: "Finanza",
    to: "finance",
  },
  {
    icon: <PersonOutlinedIcon></PersonOutlinedIcon>,
    label: "Dipendenti",
    to: "dipendenti",
  },
  {
    icon: <FolderOutlinedIcon></FolderOutlinedIcon>,
    label: "Archivio multimediale",
    to: "archivio",
  },
];

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        sx={{
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            transition: theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <CustomDrawer
        variant="persistent"
        anchor="left"
        open={open}
        handleClose={() => setOpen(false)}
        width={drawerWidth}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box component="img" src={logo} alt="logo" sx={{ width: 270 }} />
          <List sx={{ width: "100%", height: "100%" }}>
            {navItems.map((item) => (
              <ListItem key={item.to} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={NavLink}
                  to={item.to}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                    "&.active": {
                      // stile quando la route è attiva
                      backgroundColor: "action.selected",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </CustomDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          ml: 0,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar /> {/* sposta giù il contenuto sotto l'AppBar */}
        <Box sx={{ flex: 1, minHeight: 0, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
