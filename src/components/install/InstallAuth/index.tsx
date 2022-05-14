import React, { memo, useCallback, useEffect, useState } from "react";
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
import { SecondPage } from "./SecondPage";
import { useRecoilValue } from "recoil";
import { authServiceState } from "recoil/atoms";
import { FirstPage } from "./FirstPage";
import { ThirdPage } from "./ThirdPage";
import { InstallAuthInput } from "do-ents/useInstallAuth";
import { useService } from "do-ents/useService";

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

export const InstallAuth = memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<InstallAuthInput>({
    id: 1,
    driver: "mysql",
    host: "localhost",
    port: "3306",
    database: "",
    user: "root",
    password: "",
    url: "http://localhost:4000/graphql",
    admin: "admin",
    adminPassword: "",
    withDemo: false,
  });

  const { service, loading, error, refresh } = useService(values.url);
  useEffect(() => {
    if (service?.id || error) {
      setStep(3);
    } else {
      setStep(1);
    }
  }, [error, service?.id]);

  const handleChange = (values: InstallAuthInput) => {
    setValues({ ...values });
  };
  const authService = useRecoilValue(authServiceState);

  useEffect(() => {
    if (authService) {
      history.push(INDEX_URL);
    }
  }, [history, authService]);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: PRIMARY_COLOR,
      },
    },

    shadows: [...useShadows()] as any,
  });

  const handleNext = useCallback(() => {
    setStep(2);
  }, []);

  const handelPrevious = useCallback(() => {
    setStep(1);
  }, []);

  const handleUrlChange = useCallback((url: string) => {
    setValues((values) => ({ ...values, url }));
  }, []);

  const handleFinished = useCallback(() => {
    refresh();
  }, [refresh]);

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
                {step === 1 && (
                  <FirstPage
                    loading={loading}
                    values={values}
                    onValuesChange={handleChange}
                    onNext={handleNext}
                  />
                )}
                {step === 2 && (
                  <SecondPage
                    values={values}
                    onValuesChange={handleChange}
                    onPrevious={handelPrevious}
                    onFinshed={handleFinished}
                  />
                )}
                {step === 3 && (
                  <ThirdPage
                    url={values.url}
                    error={error}
                    service={service}
                    onUrlChange={handleUrlChange}
                  />
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
});
