import { LoadingButton } from "@mui/lab";
import { Button, Container, Stack, styled, TextField, useTheme, Box } from "@mui/material"
import { useCreateGQLClient } from "do-ents/useCreateGQLClient";
import { memo, useCallback, useState } from "react"
import intl from "react-intl-universal"

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
  const createClient = useCreateGQLClient();
  const theme = useTheme()
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


  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 2 }}>
        <input accept="image/*" type="file" onChange={handleFileChange} style={{ color: theme.palette.text.secondary }} />
      </Box>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <TextField label={intl.get("name")} variant="outlined" size="small" value={name} onChange ={handleNameChange}/>
        <LoadingButton variant="contained" component="span" disabled={!file}>
          {intl.get("upload")}
        </LoadingButton>
      </Stack>
    </Container>
  )
})