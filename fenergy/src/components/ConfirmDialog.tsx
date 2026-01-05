import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import type { ConfirmModalProps } from "./types";

export default React.memo(function ConfirmDialog(props: ConfirmModalProps) {
  const { description, handleClose, open, title, handleConfirm } = props;
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleConfirm}>Conferma</Button>
            <Button onClick={handleClose}>Annulla</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
});
