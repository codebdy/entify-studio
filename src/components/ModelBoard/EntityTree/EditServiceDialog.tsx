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
import { useSelectedService } from "hooks/useSelectedService";
import { useShowServerError } from "hooks/useShowServerError";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import intl from "react-intl-universal";
import { useSetRecoilState } from "recoil";
import { refreshServicesState } from "recoil/atoms";
import LazyTextField from "../PropertyBox/LazyTextField";

export const EditServiceDialog = memo(
  (props: { open: boolean; onClose: () => void }) => {
    const { open, onClose } = props;
    const service = useSelectedService();
    const [name, setName] = useState(service?.name);

    const setRefresh = useSetRecoilState(refreshServicesState);

    useEffect(() => {
      setName(service?.name);
    }, [service]);

    const [add, { loading: adding, error: addError }] = useRegisterService({
      onCompleted: (status: boolean) => {
        if (status) {
          handleClose();
          setRefresh((flag) => flag + 1);
        }
      },
    });

    useShowServerError(addError);

    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    const handleChangeServiceName = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      },
      []
    );

    const handleEdit = useCallback(() => {
      //add(values);
    }, []);

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
                  value={service?.url || ""}
                  variant="outlined"
                  size="small"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={intl.get("service-name")}
                  value={name}
                  variant="outlined"
                  onChange={handleChangeServiceName}
                  size="small"
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" sx={{ mb: 1 }} onClick={handleClose}>
              {intl.get("cancel")}
            </Button>
            <LoadingButton
              variant="contained"
              sx={{ mr: 2, mb: 1 }}
              disabled={!name || !service?.url}
              loading={adding}
              onClick={handleEdit}
            >
              {intl.get("edit")}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);
