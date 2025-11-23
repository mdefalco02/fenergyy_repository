import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import type { JSX } from "react";

const drawerWidth = 320;

interface CustomDrawerProps {
  // Titolo del drawer
  title: string;
  // true = aperto, false = chiuso
  open: boolean;
  // funzione che chiude il drawer
  handleClose: () => void;
  children?: JSX.Element;
}

export default function CustomDrawer({
  title,
  open,
  handleClose,
  children,
}: CustomDrawerProps) {
  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={open}
      onClose={handleClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          zIndex: 2000,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography>{title}</Typography>
        <Box>{children}</Box>
      </Box>
    </Drawer>
  );
}
