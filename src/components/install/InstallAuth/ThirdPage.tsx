import { Box, Button, Grid } from "@mui/material";
import React, { useCallback } from "react";
import intl from "react-intl-universal";
import { PageLayout } from "../PageLayout";
import { useHistory } from "react-router";
import { LoadingButton } from "@mui/lab";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import { GraphQLError } from "graphql-request/dist/types";
import { Service } from "components/ModelBoard/meta/Service";

export const ThirdPage = (props: {
  error?: GraphQLError;
  url: string;
  service?: Service;
  onUrlChange: (url: string) => void;
}) => {
  const { error, url, service, onUrlChange } = props;
  const history = useHistory();

  const handleChangeUrl = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onUrlChange(event.target.value);
    },
    [onUrlChange]
  );
  const handleInstall = () => {
    //install({data:values})
  };

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
            loading={false}
            type="button"
            disabled={!service?.id}
            onClick={handleInstall}
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
        {error ? (
          <Box sx={{ color: "red" }}>{error?.message}</Box>
        ) : (
          url && intl.get("auth-finished")
        )}
      </Grid>
    </PageLayout>
  );
};
