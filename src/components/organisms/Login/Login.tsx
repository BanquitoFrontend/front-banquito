import React, { useState, useEffect } from 'react'
import { Container, FormLabel, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EnvManager from '../../../config/EnvManager';
import LoadOrganism from '../LoadOrganism';

interface userProps {
    username: string,
    password: string,
    identification: string,
    typeIdentification: string
}
interface Props {
    setUser: (data: any) => void,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
    redirect: string
}

const Login = ({ setUser, setIsLogged, redirect }: Props) => {

    const navigate = useNavigate();

    const [userName, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setisLoading] = useState<boolean>(false);

    const urlGetClientWithEmail = `${EnvManager.CLIENT_URL}/api/client/email/`;

    const fetchClient = async () => {
        try {
            const response = await fetch(
                urlGetClientWithEmail + `${userName}`
            );
            const data = await response.json();
            console.log(data);
            setUser({ username: userName, password: password, identification: data.identification, typeIdentification: data.identificationType })
        } catch (error) {
            console.error(error)
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setisLoading(true);
        try {
            const response = await fetch(`${EnvManager.CLIENT_URL}/api/client/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    "userName": userName,
                    "password": password
                })
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            alert("Ingresa con éxito")

            setIsLogged(true)
            fetchClient();
            navigate(redirect)

        } catch (error) {
            console.error(error)
        } finally {
            setisLoading(false);
        }
    }

    return (
        <>
            <Container sx={containertTitleStyles}>
                <Typography variant="h4" align="center">
                    Iniciar Sesion
                </Typography>
            </Container>
            <Container sx={containerStyles}>
            </Container >
            <Container sx={containerTextFieldStyles}>
                <FormLabel sx={formLabelStyles}>Email:</FormLabel>
                <TextField
                    value={userName}
                    onChange={(event) => setUsername(event.target.value)}
                    variant="standard"
                />
            </Container>
            <Container sx={containerTextFieldStyles}>
                <FormLabel sx={formLabelStyles}>Contraseña:</FormLabel>
                <TextField
                    value={password}
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    variant="standard"
                />
            </Container>
            <Container sx={containerTextFieldStyles}>
                <Button onClick={handleSubmit} sx={buttonStyles}>Ingresar</Button>
            </Container>
            <LoadOrganism active={isLoading} />
        </>
    )
}

export default Login;

const containerStyles = () => ({
    display: 'flex',
    justifyContent: 'flex-start',
});

const containertTitleStyles = () => ({
    textAlign: 'center',
    marginTop: '70px',
    marginBottom: '20px'
});

const containerTextFieldStyles = () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '50px',
});

const containerFormLabelStyles = () => ({
    marginTop: '50px',
    marginLeft: '280px'
});

const formLabelStyles = () => ({
    marginRight: '10px',
});

const buttonStyles = () => ({
    background: '#1D3557',
    color: 'white',
    ':hover': {
        background: '#1D3557',
        color: 'white'
    }
});
