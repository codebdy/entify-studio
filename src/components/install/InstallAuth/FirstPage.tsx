import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useCallback, useState } from "react";
import intl from "react-intl-universal";
import { PageLayout } from "../PageLayout";
import { LoadingButton } from "@mui/lab";
import { InstallInput, useInstallRegistry } from "do-ents/useInstallRegistry";
import { useShowServerError } from "hooks/useShowServerError";
import { useSetRecoilState } from "recoil";
import { installedState } from "recoil/atoms";

export const FirstPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<InstallInput>({
    driver: "mysql",
    host: "localhost",
    port: "3306",
    database: "",
    user: "root",
    password: "",
  });

  const setInstalled = useSetRecoilState(installedState);

  const [install, { loading, error }] = useInstallRegistry({
    onCompleted: (status: boolean) => {
      if (status) {
        setInstalled(status);
      }
    },
  });

  useShowServerError(error);

  const handleChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    },
    [values]
  );

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleInstall = useCallback(() => {
    install(values);
  }, [install, values]);

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
          <LoadingButton
            variant="contained"
            color="primary"
            size="large"
            loading={loading}
            type="button"
            disabled={
              !values.driver ||
              !values.host ||
              !values.port ||
              !values.database ||
              !values.user
            }
            onClick={handleInstall}
          >
            {intl.get("next-step")}
          </LoadingButton>
        </>
      }
    >
      <Grid item xs={6}>
        <TextField
          fullWidth
          label={intl.get("database-type")}
          value={values.driver}
          variant="outlined"
          onChange={handleChange("type")}
          size="small"
          disabled
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label={intl.get("host")}
          value={values.host}
          variant="outlined"
          onChange={handleChange("host")}
          size="small"
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label={intl.get("port")}
          value={values.port}
          variant="outlined"
          onChange={handleChange("port")}
          size="small"
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label={intl.get("database")}
          value={values.database || ""}
          variant="outlined"
          onChange={handleChange("database")}
          size="small"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={intl.get("user-name")}
          value={values.user}
          variant="outlined"
          onChange={handleChange("username")}
          size="small"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel
            htmlFor="standard-adornment-password"
            style={{ background: "#fff", padding: "0 8px" }}
          >
            {intl.get("password")}
          </InputLabel>
          <OutlinedInput
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </PageLayout>
  );
};
