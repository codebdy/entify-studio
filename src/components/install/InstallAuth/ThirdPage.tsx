import { Box, Button, Grid, TextField } from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import intl from "react-intl-universal";
import { PageLayout } from "../PageLayout";
import { useHistory } from "react-router";
import { LoadingButton } from "@mui/lab";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import { GraphQLError } from "graphql-request/dist/types";
import { Service } from "components/ModelBoard/meta/Service";
import { useRegisterService } from "do-ents/useRegisterService";
import { LOGIN_URL } from "util/consts";
import { ServiceType } from "do-ents/ServiceInput";

export const ThirdPage = memo(
  (props: {
    error?: GraphQLError;
    url: string;
    service?: Service;
    onUrlChange: (url: string) => void;
  }) => {
    const { error, url, service, onUrlChange } = props;
    const [name, setName] = useState("Authentication service");
    const history = useHistory();

    const [register, { loading, error: addError }] = useRegisterService({
      onCompleted: (status: boolean) => {
        if (status) {
          history.push(LOGIN_URL);
        }
      },
    });

    const handleChangeName = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      },
      []
    );

    const handleChangeUrl = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onUrlChange(event.target.value);
      },
      [onUrlChange]
    );
    const handleFinish = () => {
      service && register({ ...service, name, url, serviceType: ServiceType.EntifyAuth });
    };

    const err = error || addError;

    return (
      <PageLayout
        action={
          <>
            <Button
              color="primary"
              size="large"
              variant="contained"
              sx={{ mr: 1 }}
              disabled
            >
              {intl.get("previous-step")}
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              size="large"
              loading={loading}
              type="button"
              disabled={!service?.id}
              onClick={handleFinish}
            >
              {intl.get("finish")}
            </LoadingButton>
          </>
        }
      >
        <Grid item xs={12}>
          <LazyTextField
            fullWidth
            label="URL"
            type="url"
            value={url || ""}
            variant="outlined"
            onChange={handleChangeUrl}
            size="small"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={intl.get("name")}
            value={name}
            variant="outlined"
            onChange={handleChangeName}
            size="small"
            required
          />
        </Grid>
        <Grid item xs={12}>
          {err ? (
            <Box sx={{ color: "red" }}>{err?.message}</Box>
          ) : (
            url && intl.get("auth-finished")
          )}
        </Grid>
      </PageLayout>
    );
  }
);
