import { Box, Typography, TextField } from "@mui/material";
import { useState, FormEvent, ChangeEvent } from "react";
import { ButtonStyle } from "../../style/ButtonStyle";
import { ColorPalette } from "../../style/ColorPalette";
import { SizeButton } from "../atoms/SizeButton";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


interface AtmLoginFormProps {
    title?: string,
    codeLocalAccount?: boolean;
    password?: boolean;
    atm?: boolean
    onSubmit?: (data: any) => void,
}

interface ATMLoginForm {
    codeLocalAccount: string,
    password: string,
}

const buttonATMSize = {
    height: 75,
    width: 200
}

const AtmLoginForm = (props: AtmLoginFormProps) => {
    const [login, setlogin] = useState<ATMLoginForm>({
        codeLocalAccount: "",
        password: ""
    });

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(login);
        setlogin({
            codeLocalAccount: "",
            password: ""
        });
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setlogin({ ...login, [name]: value });
    }

    return (
        <>
            <Box
                component="form"
                onSubmit={submitHandler}
                sx={{
                    overflowX: 'hidden',
                    overflowY: 'hidden'
                }}>
                <Box>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {props.title || 'Cuenta'}
                    </Typography>
                </Box>
                <Box>
                    {!!props.codeLocalAccount && <TextField
                        id="codeLocalAccount"
                        name="codeLocalAccount"
                        margin="normal"
                        type="text"
                        onChange={handleFormChange}
                        label='Numero de Cuenta'
                        fullWidth
                        required
                    />}
                    {
                        !!props.password && <TextField
                            id="password"
                            name="password"
                            margin="normal"
                            type="password"
                            onChange={handleFormChange}
                            label='Contraseña'
                            fullWidth
                            required
                        />
                    }
                </Box>
                {!!props.atm ?
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: -30,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                        <div style={{ margin: '1rem 0' }}>
                            <SizeButton
                                submit
                                text={'Siguiente'}
                                icon={<ChevronRight />}
                                style={ButtonStyle.BIG}
                                size={buttonATMSize}
                                palette={{
                                    backgroundColor: ColorPalette.PRIMARY,
                                }} />
                        </div>
                    </div>
                    : <Box>
                        <SizeButton
                            palette={{
                                backgroundColor: ColorPalette.PRIMARY
                            }}
                            size={{
                                height: 'auto',
                                width: 'auto'
                            }}
                            style={ButtonStyle.BIG}
                            submit
                            text="Siguiente" />
                    </Box>}
            </Box>
        </>
    );
};

export default AtmLoginForm;