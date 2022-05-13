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
import { InstallAuthInput } from "do-ents/useInstallAuth";

export const FirstPage = (props:{
  values: InstallAuthInput
  onValuesChange: (values: InstallAuthInput) => void;
  onNext:()=>void;
}) => {
  const {values, onValuesChange, onNext} = props
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      onValuesChange({ ...values, [prop]: event.target.value });
    },
    [onValuesChange, values]
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

  const handleNext = useCallback(() => {
    onNext()
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
        <TextField
          fullWidth
          label="URL"
          type="url"
          value={values.url || ""}
          variant="outlined"
          onChange={handleChange("url")}
          size="small"
          required
        />
      </Grid>
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
