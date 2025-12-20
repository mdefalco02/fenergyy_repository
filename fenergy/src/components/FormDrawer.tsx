import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { memo, useMemo } from "react";
import { collapsedWidth, drawerWidth, type FormDrawerProps } from "./types";

const FormDrawer = memo(function FormDrawer(props: FormDrawerProps) {
  const { title, open, handleClose, children } = props;
  const currentWidth = useMemo(() => {
    return open ? drawerWidth : collapsedWidth;
  }, [open]);

  const memoizatedTitle = useMemo(() => {
    return title ?? "";
  }, [title]);

  return (
    <Drawer
      {...props}
      open={open}
      onClose={handleClose}
      sx={{
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
      <Box sx={{ padding: "32px 16px" }}>
        {memoizatedTitle ?? <Typography>{memoizatedTitle}</Typography>}
        <Box>{children}</Box>
      </Box>
    </Drawer>
  );
});

export default FormDrawer;
