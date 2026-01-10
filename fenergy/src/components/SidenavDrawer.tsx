import { Box, Drawer, useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import { collapsedWidth, drawerWidth, type SidenavDrawerProps } from "./types";

const SidenavDrawer = memo(function SidenavDrawer(props: SidenavDrawerProps) {
  const { children, handleClose, logo, open } = props;
  const theme = useTheme();

  const currentWidth = useMemo(() => {
    return open ? drawerWidth : collapsedWidth;
  }, [open]);

  const enterDuration = theme.transitions.duration.enteringScreen;
  const exitDuration = theme.transitions.duration.leavingScreen;
  const easing = theme.transitions.easing.sharp;

  return (
    <Drawer
      {...props}
      open={open}
      onClose={handleClose}
      sx={{
        width: currentWidth,
        flexShrink: 0,
        flexBasis: "auto",
        "& .MuiDrawer-paper": {
          width: currentWidth,
          boxSizing: "border-box",
          transform: open ? "translateX(0)" : `translateX(-${currentWidth}px)`,
          transition: theme.transitions.create("transform", {
            easing,
            duration: open ? enterDuration : exitDuration,
          }),
        },
        "& .MuiToolbar-root": {
          display: "none",
        },
      }}
    >
      <Box
        component="img"
        alt="logo"
        src={logo}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 16px",
          backgroundColor: "black",
          boxShadow: (theme) => theme.shadows[4],
        }}
      ></Box>
      <Box sx={{ padding: "0px 16px" }}>{children}</Box>
    </Drawer>
  );
});

export default SidenavDrawer;
