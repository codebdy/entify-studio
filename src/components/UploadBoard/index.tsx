import { LoadingButton } from "@mui/lab";
import { Container, Stack, TextField, useTheme, Box } from "@mui/material"
import { useCreateGQLClient } from "do-ents/useCreateGQLClient";
import { memo, useCallback, useState } from "react"
import intl from "react-intl-universal"
import { useSelectedService } from 'components/ModelBoard/hooks/useSelectedService';
import { ServerError } from "do-ents/ServerError";
import { ClientError } from "graphql-request";
import { parseErrorMessage } from "do-ents/parseErrorMessage";
import { useShowServerError } from 'hooks/useShowServerError';

const gql = `
  mutation upload($file:Upload!, $name:string){
    singleUpload(file:$file, name:$name){
      id
    }
  }
`

export const UploadBoard = memo(() => {
  const [name, setName] = useState("")
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  
  const createClient = useCreateGQLClient();
  const theme = useTheme()
  const service = useSelectedService()

  useShowServerError(error)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files?.length) {
        setName(files[0].name)
        setFile(files[0])
      }
    },
    [setFile]
  );

  const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
    setName(event.target.value)
  }, [])

  const handleUpload = useCallback(()=>{
    const graphQLClient = createClient(service?.url);

    graphQLClient.setHeader("Content-Type", "multipart/form-data")
    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(gql, { file, name })
      .then((data) => {
        setLoading(false);
      })
      .catch((err: ClientError) => {
        const message = parseErrorMessage(err);
        setLoading(false);
        const serverError:ServerError = { message: message, serverUrl:service?.url }
        setError(serverError);
        console.error(err);
      });
  }, [createClient, file, name, service?.url])

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 2 }}>
        <input accept="image/*" type="file" onChange={handleFileChange} style={{ color: theme.palette.text.secondary }} />
      </Box>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <TextField label={intl.get("name")} variant="outlined" size="small" value={name} onChange ={handleNameChange}/>
        <LoadingButton variant="contained" loading = {loading} component="span" disabled={!file} onClick = {handleUpload}>
          {intl.get("upload")}
        </LoadingButton>
      </Stack>
    </Container>
  )
})