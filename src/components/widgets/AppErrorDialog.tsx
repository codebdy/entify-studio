import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Dialog } from "@mui/material";
import { useRecoilState } from "recoil";
import { appErrorState } from "recoil/atoms";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} square />;
}

export const AppErrorDialog = () => {
  const [error, setError] = useRecoilState(appErrorState);
  const handleClose = () => {
    setError(undefined);
  };

  return (
    <Dialog
      open={!!error}
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
        {error}
      </Alert>
    </Dialog>
  );
};
