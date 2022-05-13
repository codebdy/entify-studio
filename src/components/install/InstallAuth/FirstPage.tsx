import { Grid, Button, CircularProgress } from "@mui/material";
import React, { memo, useCallback } from "react";
import intl from "react-intl-universal";
import { PageLayout } from "../PageLayout";
import { InstallAuthInput, InstallServiceInput } from "do-ents/useInstallAuth";
import { ServiceInstallFragment } from "./ServiceInstallFragment";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";

export const FirstPage = memo(
  (props: {
    loading?: boolean;
    values: InstallAuthInput;
    onValuesChange: (values: InstallAuthInput) => void;
    onNext: () => void;
  }) => {
    const { loading, values, onValuesChange, onNext } = props;

    const handleChangeUrl = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onValuesChange({ ...values, url: event.target.value });
      },
      [onValuesChange, values]
    );

    const handleChange = useCallback(
      (newValues: InstallServiceInput) => {
        onValuesChange({ ...values, ...newValues });
      },
      [onValuesChange, values]
    );

    const handleNext = useCallback(() => {
      onNext();
    }, [onNext]);

    return (
      <PageLayout
        action={
          <>
            <Button
              color="primary"
              size="large"
              variant="contained"
              disabled
              sx={{ mr: 1 }}
            >
              {intl.get("previous-step")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="button"
              disabled={
                !values.id ||
                !values.url ||
                !values.driver ||
                !values.host ||
                !values.port ||
                !values.database ||
                !values.user
              }
              onClick={handleNext}
            >
              {intl.get("next-step")}
            </Button>
          </>
        }
      >
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
          />
        </Grid>
        {loading ? (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          <ServiceInstallFragment
            values={values}
            onValuesChange={handleChange}
          />
        )}
      </PageLayout>
    );
  }
);
