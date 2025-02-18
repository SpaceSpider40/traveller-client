import {Button, Card, CardContent, Container, FormControl, Stack, TextField, Typography} from "@mui/material";

function LoginView() {

  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(new FormData(event.currentTarget));
  }

  return <Container
    sx={{width: '100vw', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>Traveller</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <FormControl>
              <TextField label="Email" variant="outlined" fullWidth size="small" required/>
            </FormControl>
            <FormControl>
              <TextField type="password" label="Password" variant="outlined" fullWidth size="small" required/>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">Login</Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  </Container>;
}

export default LoginView;