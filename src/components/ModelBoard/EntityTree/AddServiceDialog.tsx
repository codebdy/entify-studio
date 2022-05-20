import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  SvgIcon,
  TextField,
} from "@mui/material";
import { useRegisterService } from "do-ents/useRegisterService";
import { useServiceCheck } from "do-ents/useServiceCheck";
import { useShowServerError } from "hooks/useShowServerError";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import intl from "react-intl-universal";
import { Service } from "../meta/Service";
import LazyTextField from "../PropertyBox/LazyTextField";

export const AddServiceDialog = memo(
  (props: { onAddFinished: () => void; onClose: () => void }) => {
    const { onAddFinished, onClose } = props;
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<Service>({
      name: intl.get("new-service"),
      url: "",
    });

    const [add, { loading: adding, error: addError }] = useRegisterService({
      onCompleted: (status: boolean) => {
        if (status) {
          handleClose();
          setValues({ name: intl.get("new-service"), url: "" });
        }
        onAddFinished();
      },
    });

    const [check, { installed, loading, error: checkError }] =
      useServiceCheck();

    useShowServerError(addError);

    const handleClickOpen = useCallback(() => {
      setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
      setOpen(false);
      onClose()
    }, [onClose]);

    const handleChangeServiceName = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues((values) => ({ ...values, name: event.target.value }));
      },
      []
    );

    const handleChangeUrl = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setValues((values) => ({ ...values, url }));
        if (url) {
          check(url);
        }
      },
      [check]
    );

    const handleAdd = useCallback(() => {
      add(values);
    }, [add, values]);

    return (
      <>
        <Button
          variant="contained"
          size="small"
          startIcon={
            <SvgIcon>
              <path
                fill="currentColor"
                d="M16 12C16 10.89 15.55 9.89 14.83 9.17L16.24 7.76C17.33 8.85 18 10.35 18 12C17.28 12 16.6 12.13 15.96 12.36C15.97 12.24 16 12.12 16 12M20 12.34C20.68 12.59 21.33 12.96 21.88 13.43C21.95 12.96 22 12.5 22 12C22 9.24 20.88 6.74 19.07 4.93L17.66 6.34C19.11 7.78 20 9.79 20 12C20 12.12 20 12.23 20 12.34M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M6.34 6.34L4.93 4.93C3.12 6.74 2 9.24 2 12S3.12 17.26 4.93 19.07L6.34 17.66C4.89 16.22 4 14.22 4 12C4 9.79 4.89 7.78 6.34 6.34M7.76 7.76C6.67 8.85 6 10.35 6 12S6.67 15.15 7.76 16.24L9.17 14.83C8.45 14.11 8 13.11 8 12S8.45 9.89 9.17 9.17L7.76 7.76M19 14H17V17H14V19H17V22H19V19H22V17H19V14Z"
              />
            </SvgIcon>
          }
          onClick={handleClickOpen}
        >
          {intl.get("add-service")}
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>{intl.get("add-service")}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ pt: 2, pb: 2 }}>
              <Grid item xs={12}>
                <LazyTextField
                  fullWidth
                  label="URL"
                  type="url"
                  value={values.url || ""}
                  variant="outlined"
                  onChange={handleChangeUrl}
                  size="small"
                  required
                  InputProps={{
                    endAdornment: loading ? (
                      <CircularProgress size={24} />
                    ) : undefined,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={intl.get("service-name")}
                  value={values.name}
                  variant="outlined"
                  onChange={handleChangeServiceName}
                  size="small"
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ color: "red" }}>
              {!!values.url && checkError?.message}
              {installed === false && intl.get("service-not-install")}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" sx={{ mb: 1 }} onClick={handleClose}>
              {intl.get("cancel")}
            </Button>
            <LoadingButton
              variant="contained"
              sx={{ mr: 2, mb: 1 }}
              disabled={
                !values.name ||
                !values.url ||
                loading ||
                !!checkError ||
                !installed
              }
              loading={adding}
              onClick={handleAdd}
            >
              {intl.get("add")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);
