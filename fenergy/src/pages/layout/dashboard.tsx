import DarkModeIcon from "@mui/icons-material/DarkMode";

import LightModeIcon from "@mui/icons-material/LightMode";
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
import SidenavDrawer from "../../components/SidenavDrawer";
import { drawerWidth, navItems } from "../../components/types";
import logo from "/images/FEnergy-logo-gestionale-def-nb.png";

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const transition = theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.standard,
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          transition,
          ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            transition,
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
          >
            {theme.palette.mode !== "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, display: "flex", minHeight: 0 }}>
        <SidenavDrawer
          variant="permanent"
          anchor="left"
          logo={logo}
          open={open}
          handleClose={() => setOpen(false)}
          sx={{
            padding: "32px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            "&. MuiBackdrop-root": {
              display: "none",
            },
          }}
        >
          <List sx={{ width: "100%", flex: 1 }}>
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
        </SidenavDrawer>
        <Box sx={{ flex: 1, minWidth: 0, overflow: "auto", p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
