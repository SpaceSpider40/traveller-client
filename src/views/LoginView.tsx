import {
    Alert,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Snackbar,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import UserService from "../services/UserService.ts";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";

function LoginView() {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [authFailure, setAuthFailure] = useState<boolean>(false);
    
    useEffect(() => {
        if (UserService.isAuthenticated()) {
            navigate("/");
        }    
    }, [navigate])
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsFetching(true);
        UserService.instance.authenticate(email, password)
            .then(onAuth)
            .catch(onError)
            .finally(() => setIsFetching(false));
    }

    const onAuth = () => {
        navigate("/");
    }

    const onError = (e: AxiosError) => {
        console.error(e.message)

        setAuthFailure(true);
    }

    return <Container
        sx={{
            width: '100vw',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" gutterBottom>Traveller</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <FormControl>
                            <TextField value={email}
                                       onChange={(event) => setEmail(event.currentTarget.value)}
                                       label="Email" variant="outlined"
                                       fullWidth size="small" required/>
                        </FormControl>
                        <FormControl>
                            <TextField value={password}
                                       onChange={(event) => setPassword(event.currentTarget.value)}
                                       type="password" label="Password"
                                       variant="outlined" fullWidth size="small"
                                       required/>
                        </FormControl>

                        <Button type="submit" variant="outlined"
                                color="primary"
                                loading={isFetching}
                        >
                            Login
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={authFailure}
            autoHideDuration={6000}
            onClose={() => setAuthFailure(false)}
        >
            <Alert severity="error" variant="outlined" sx={{width: '100%'}}>
                Failed to authenticate
            </Alert>
        </Snackbar>
    </Container>;
}

export default LoginView;