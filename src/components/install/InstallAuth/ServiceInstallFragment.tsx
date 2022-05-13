import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InstallServiceInput } from "do-ents/useInstallAuth";
import { memo, useCallback, useState } from "react";
import intl from "react-intl-universal";

export const ServiceInstallFragment = memo(
  (props: {
    values: InstallServiceInput;
    onValuesChange: (values: InstallServiceInput) => void;
  }) => {
    const { values, onValuesChange } = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = useCallback(
      (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onValuesChange({ ...values, [prop]: event.target.value });
      },
      [onValuesChange, values]
    );

    const handleChangeServiceId = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onValuesChange({ ...values, id: parseInt(event.target.value) });
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
    return (
      <>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label={intl.get("service-id")}
            type="number"
            value={values.id}
            variant="outlined"
            onChange={handleChangeServiceId}
            size="small"
            required
          />
        </Grid>
        <Grid item xs={6}></Grid>
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
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
      </>
    );
  }
);
