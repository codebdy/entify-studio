import { LoadingButton } from "@mui/lab";
import { Container, Stack, TextField, useTheme, Box } from "@mui/material"
import { memo, useCallback, useState } from "react"
import intl from "react-intl-universal"
import { useSelectedService } from 'components/ModelBoard/hooks/useSelectedService';
import { ServerError } from "do-ents/ServerError";
import { useShowServerError } from 'hooks/useShowServerError';
import { AwesomeGraphQLClient, GraphQLRequestError } from 'awesome-graphql-client'
import { useToken } from "hooks/useToken";
import { AUTHORIZATION, TOKEN_PREFIX } from "util/consts";

const gql = `
  mutation upload($file:Upload!, $name:String){
    singleUpload(media:{file:$file, name:$name}){
      id
    }
  }
`

export const UploadBoard = memo(() => {
  const [name, setName] = useState("")
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  const token = useToken();
  
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
    if (!service?.url){
      return 
    }
    const client = new AwesomeGraphQLClient({ endpoint: service.url})
    //graphQLClient.setHeader()
    //    client.setHeader(AUTHORIZATION, token ? `${TOKEN_PREFIX}${token}` : "");
    setLoading(true);
    setError(undefined);
    client
      .request(gql, { file, name }, {headers: {[AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : ""}})
      .then((data) => {
        setLoading(false);
      })
      .catch((err: GraphQLRequestError) => {
        setLoading(false);
        console.error(err);
        setError(err as any)
      });
  }, [file, name, service?.url, token])

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