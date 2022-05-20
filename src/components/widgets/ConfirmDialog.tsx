import React, { useMemo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import intl from "react-intl-universal";
import { useRecoilState } from "recoil";
import { confirmState } from "recoil/atoms";

export const ConfirmDialog = () => {
  const [confirm, setConfirm] = useRecoilState(confirmState);

  const handelCancel = () => {
    setConfirm(undefined);
  };

  const handleConfirm = () => {
    confirm?.callback && confirm.callback();
    setConfirm(undefined);
  };

  const confirmMessage = useMemo(() => {
    let message = confirm?.message?.trim();
    if (message?.startsWith("$")) {
      message = intl.get(message.replace("$", ""));
    }
    return message;
  }, [confirm?.message]);

  return (
    <Dialog
      open={!!confirm?.message}
      onClose={handelCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {intl.get("operation-confirm")}
      </DialogTitle>
      <DialogContent style={{ minWidth: "400px" }}>
        <DialogContentText id="alert-dialog-description">
          {confirmMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handelCancel}>{intl.get("cancel")}</Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          {intl.get("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
