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
  const createClient = useCreateGQLClient();
  const theme = useTheme()
  const handleUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files?.length) {
        setName(files[0].name)
      }
      console.log(files)
    },
    []
  );


  return (
    <Container maxWidth="xl">
      <Box sx={{mt:2}}>
        <input accept="image/*" type="file" onChange={handleUpload} style={{ color: theme.palette.text.secondary }} />
      </Box>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <TextField label={intl.get("name")} variant="outlined" size="small" value={name} />
        <LoadingButton variant="contained" component="span">
          {intl.get("upload")}
        </LoadingButton>
      </Stack>
    </Container>
  )
})