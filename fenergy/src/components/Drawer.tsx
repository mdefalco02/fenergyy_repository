import { Typography, type SxProps, type Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { useMemo, type JSX } from "react";

const drawerWidth = 320;
const collapsedWidth = 0;
interface CustomDrawerProps {
  // Titolo del drawer
  title?: string;
  // true = aperto, false = chiuso
  open: boolean;
  // funzione che chiude il drawer
  handleClose: () => void;
  anchor?: "right" | "left" | "top" | "bottom" | undefined;
  children?: JSX.Element;
  sx?: SxProps<Theme> | undefined;
  variant?: "temporary" | "permanent" | "persistent" | undefined;
  width?: number;
}

export default function CustomDrawer({
  title,
  open,
  handleClose,
  children,
  anchor,
  sx,
  variant,
}: CustomDrawerProps) {
  const currentWidth = useMemo(() => {
    return open ? drawerWidth : collapsedWidth;
  }, [open]);

  return (
    <Drawer
      anchor={anchor ?? "right"}
      variant={variant ?? "temporary"}
      open={open}
      onClose={handleClose}
      sx={{
        ...sx,
        flexShrink: 0,
        width: currentWidth,
        "& .MuiDrawer-paper": {
          width: currentWidth,
          boxSizing: "border-box",
          zIndex: 2000,
        },
        "& .MuiToolbar-root": {
          display: "none",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ padding: "32px 16px" }}>
        <Typography>{title ?? ""}</Typography>
        <Box>{children}</Box>
      </Box>
    </Drawer>
  );
}
