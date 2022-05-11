import React, { useEffect, useState } from "react";
import {
  Theme,
  Grid,
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import background from "assets/img/background1.jpg";
import rightImage from "assets/img/security.png";
import intl from "react-intl-universal";
import { useHistory } from "react-router";
import { INDEX_URL, PRIMARY_COLOR } from "../../../util/consts";
import useShadows from "../../../util/useShadows";
import { Alert } from "@mui/material";
import { InstallPage } from "./InstallPage";
import { useRecoilValue } from "recoil";
import { installedState } from "recoil/atoms";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundImage: `url(${background})`,
      backgroundPosition: " 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },

    installBox: {
      background: "#FFF",
      minHeight: "480px",
      boxShadow: theme.shadows[23],
    },

    rightImage: {
      background: "#f2f4f4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      height: "100%",
    },

    leftInstall: {
      display: "flex",
      flexFlow: "column",
      padding: theme.spacing(4),
    },

    title: {
      fontSize: "20px",
    },
  })
);

export const InstallAuth = () => {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState<any>({
    type: "mysql",
    host: "localhost",
    port: "3306",
    database: "",
    username: "root",
    password: "",
    admin: "admin",
    adminPassword: "",
    withDemo: false,
  });

  const handleChange = (values: any) => {
    setValues({ ...values });
  };
  const installed = useRecoilValue(installedState);

  useEffect(() => {
    if (installed) {
      history.push(INDEX_URL);
    }
  }, [installed, history]);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: PRIMARY_COLOR,
      },
    },

    shadows: [...useShadows()] as any,
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Grid container justifyContent="center">
            <Grid
              container
              item
              md={7}
              sm={8}
              xs={10}
              className={classes.installBox}
              alignContent="stretch"
            >
              <Grid item lg={6} className={classes.leftInstall}>
                <div>
                  <h2 className={classes.title}>
                    {intl.get("install") + " Entify " + intl.get("auth-module")}
                  </h2>
                </div>
                {installed && (
                  <Alert severity="error">{intl.get("installed")}</Alert>
                )}
                {!installed && (
                  <InstallPage values={values} onValuesChange={handleChange} />
                )}
              </Grid>
              <Grid item lg={6} className={classes.rightImage}>
                <img src={rightImage} alt="" width="100%" />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
