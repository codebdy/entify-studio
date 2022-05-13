import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import intl from "react-intl-universal";
import { PageLayout } from "../PageLayout";
import { useHistory } from "react-router";
import { LoadingButton } from "@mui/lab";

export const SecondPage = (props: {
  values: any;
  onValuesChange: (values: any) => void;
  onPrevious: () => void;
}) => {
  const { values, onValuesChange, onPrevious } = props;
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      onValuesChange({ ...values, [prop]: event.target.value });
    };

  const handleWithDemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValuesChange({ ...values, withDemo: event.target.checked });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleNext = () => {
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
            onClick={onPrevious}
          >
            {intl.get("previous-step")}
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            size="large"
            loading={false}
            disabled={!values.admin || !values.adminPassword}
            type="button"
            onClick={handleNext}
          >
            {intl.get("next-step")}
          </LoadingButton>
        </>
      }
    >
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={intl.get("admin-name")}
          value={values.admin}
          variant="outlined"
          onChange={handleChange("admin")}
          size="small"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined" size="small" required>
          <InputLabel
            htmlFor="standard-adornment-password"
            style={{ background: "#fff", padding: "0 8px" }}
          >
            {intl.get("password")}
          </InputLabel>
          <OutlinedInput
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={values.adminPassword}
            required
            onChange={handleChange("adminPassword")}
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
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.withDemo}
              onChange={handleWithDemoChange}
              color="primary"
            />
          }
          label={intl.get("with-demo")}
        />
      </Grid>
    </PageLayout>
  );
};
