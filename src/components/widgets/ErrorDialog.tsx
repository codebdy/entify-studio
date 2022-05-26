import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Box, Dialog } from "@mui/material";
import { useRecoilState } from "recoil";
import intl from "react-intl-universal";
import { serverErrorState } from "recoil/atoms";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} square />;
}

export const ErrorDialog = () => {
  const [error, setError] = useRecoilState(serverErrorState);
  const handleClose = () => {
    setError(undefined);
  };

  return (
    <Dialog
      open={!!error?.message}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{
          minWidth: "300px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {(error?.serverUrl||"") + " " + intl.get("error") }
      </Alert>
      {error?.message && <Box sx={{ p: 2 }}>{error.message}</Box>}
    </Dialog>
  );
};
