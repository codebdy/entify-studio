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
  TextField,
} from "@mui/material";
import { useRegisterService } from "do-ents/useRegisterService";
import { useServiceCheck } from "do-ents/useServiceCheck";
import { useShowServerError } from "hooks/useShowServerError";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import intl from "react-intl-universal";
import { useSetRecoilState } from "recoil";
import { refreshServicesState } from "recoil/atoms";
import { Service } from "../meta/Service";
import LazyTextField from "../PropertyBox/LazyTextField";

export const EditServiceDialog = memo(
  (props: { open: boolean; onClose: () => void }) => {
    const { open, onClose } = props;
    const [values, setValues] = useState<Service>({
      name: intl.get("new-service"),
      url: "",
    });

    const setRefresh = useSetRecoilState(refreshServicesState);

    const [add, { loading: adding, error: addError }] = useRegisterService({
      onCompleted: (status: boolean) => {
        if (status) {
          handleClose();
          setValues({ name: intl.get("new-service"), url: "" });
          setRefresh((flag) => flag + 1);
        }
      },
    });

    const [check, { installed, loading, error: checkError }] =
      useServiceCheck();

    useShowServerError(addError);

    const handleClose = useCallback(() => {
      onClose();
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
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>{intl.get("edit-service")}</DialogTitle>
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
