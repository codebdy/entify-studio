import { LoadingButton } from "@mui/lab";
import { Container, TextField, useTheme, Grid } from "@mui/material"
import { memo, useCallback, useState } from "react"
import intl from "react-intl-universal"
import { useSelectedService } from 'components/ModelBoard/hooks/useSelectedService';
import { ServerError } from "do-ents/ServerError";
import { useShowServerError } from 'hooks/useShowServerError';
import { AwesomeGraphQLClient, GraphQLRequestError } from 'awesome-graphql-client'
import { useToken } from "hooks/useToken";
import { AUTHORIZATION, TOKEN_PREFIX } from "util/consts";
import { useRecoilState, useSetRecoilState } from "recoil";
import { successAlertState } from "recoil/atoms";
import { uploadGqlState } from "./atoms";

export const UploadBoard = memo(() => {
  const [mutation, setMutation] = useRecoilState(uploadGqlState)
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  const [data, setData] = useState<any>()
  const setSuccessAlertState = useSetRecoilState(successAlertState);
  const token = useToken();

  const theme = useTheme()
  const service = useSelectedService()

  useShowServerError(error)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files?.length) {
        setFile(files[0])
      }
    },
    [setFile]
  );

  const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMutation(event.target.value)
  }, [setMutation])

  const handleUpload = useCallback(() => {
    if (!service?.url) {
      return
    }
    const client = new AwesomeGraphQLClient({ endpoint: service.url })
    //graphQLClient.setHeader()
    //    client.setHeader(AUTHORIZATION, token ? `${TOKEN_PREFIX}${token}` : "");
    setLoading(true);
    setError(undefined);
    client
      .request(mutation, { file }, { headers: { [AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "" } })
      .then((data) => {
        setLoading(false);
        setSuccessAlertState(true)

        setData(data)
      })
      .catch((err: GraphQLRequestError) => {
        setLoading(false);
        console.error(err);
        setError(err as any)
      });
  }, [file, mutation, service?.url, setSuccessAlertState, token])

  return (
    <Container maxWidth="lg">
      {
        !!service && <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item container spacing={2} sx={{ p: 2 }} lg={6}>
            <Grid item xs={12}>
              <input accept="image/*" type="file" onChange={handleFileChange} style={{ color: theme.palette.text.secondary }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={"Mutation"}
                variant="outlined"
                multiline
                rows={16}
                size="small"
                value={mutation}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton variant="contained" loading={loading} component="span" disabled={!file} onClick={handleUpload}>
                {intl.get("upload")}
              </LoadingButton>
            </Grid>
          </Grid>
          <Grid item lg={6} sx={{ mt:5 }}>
            <TextField multiline fullWidth rows = {15} value = {data?JSON.stringify(data, null, 2): ""} />
          </Grid>
        </Grid>
      }

    </Container>
  )
})