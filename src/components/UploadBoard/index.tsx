import { Button, Container, Stack, styled } from "@mui/material"
import { useCreateGQLClient } from "do-ents/useCreateGQLClient";
import { memo, useCallback } from "react"
import intl from "react-intl-universal"

const Input = styled('input')({
  display: 'none',
});

const gql = `
  mutation upload($file:Upload!, $name:string){
    singleUpload(file:$file, name:$name){
      id
    }
  }
`

export const UploadBoard = memo(() => {
  const createClient = useCreateGQLClient();

  const handleUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      console.log(files)
    },
    []
  );


  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" type="file" onChange={handleUpload} />
          <Button variant="contained" component="span">
            {intl.get("file-upload")}
          </Button>
        </label>
      </Stack>
    </Container>
  )
})