import React, { useState, useEffect } from 'react'
import { Container, FormLabel, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EnvManager from '../../../config/EnvManager';
import { Spinner } from '../../atoms/Spinner';

interface userProps {
    username: string,
    password: string,
    identification: string,
    typeIdentification: string
}
interface Props {
    setUser: React.Dispatch<React.SetStateAction<userProps | null>>,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
    redirect: string
}

const Login = ({ setUser, setIsLogged, redirect }: Props) => {

    const navigate = useNavigate();

    const [userName, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [activateSpinner, setActivateSpinner] = useState(false);
    const urlGetClientWithEmail = `${EnvManager.CLIENT_URL}/api/client/email/`;

    const fetchClient = async () => {
        try {
            setActivateSpinner(true)
            const response = await fetch(
                urlGetClientWithEmail + `${userName}`
            );
            const data = await response.json();
            setUser({ username: userName, password: password, identification: data.identification, typeIdentification: data.typeIdentification })
            setActivateSpinner(false)
        } catch (error) {
            setActivateSpinner(false)
            console.error(error)
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            setActivateSpinner(true)
            const response = await fetch(`${EnvManager.CLIENT_URL}/api/client/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({
                    "userName": userName,
                    "password": password
                })
            })
            if (!response.ok) {
                setActivateSpinner(false)
                throw new Error(response.statusText)
            }
            setActivateSpinner(false)
            alert("Ingresa con éxito")

            setIsLogged(true)
            fetchClient();
            navigate(redirect)

        } catch (error) {
            setActivateSpinner(false)
            console.error(error)
        }
    }

    return (
        <>
            {activateSpinner ? <Spinner /> : null}
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
