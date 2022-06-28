import { Button, Container, Stack, styled } from "@mui/material"
import { memo } from "react"
import intl from "react-intl-universal"

const Input = styled('input')({
  display: 'none',
});

export const UploadBoard = memo(() => {
  return (
    <Container maxWidth ="xl">
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" />
          <Button variant="contained" component="span">
            {intl.get("file-upload")}
          </Button>
        </label>
      </Stack>
    </Container>
  )
})