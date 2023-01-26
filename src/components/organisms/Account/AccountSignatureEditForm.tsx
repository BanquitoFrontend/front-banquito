import { Box } from '@mui/system'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Dropdown } from '/src/components/atoms/Dropdown';
import { SizeButton } from '/src/components/atoms/SizeButton';
import TextFieldAtom from '/src/components/atoms/TextFieldAtom';
import { RSSignature } from '/src/services/account/dto/RSSignature';
import { ButtonStyle } from '/src/style/ButtonStyle';
import { ColorPalette } from '/src/style/ColorPalette';

const statusItems = [
    {
        name: 'ACTIVO',
        value: 'ACT'
    },
    {
        name: 'SUSPENDIDO',
        value: 'SUS'
    },
    {
        name: 'BLOQUEADO',
        value: 'BLO'
    }
]

const rolItem = [
    {
        name: 'SAMPLE',
        value: 'SAM'
    }
]

interface AccountSignatureEditFormProps {
    signature: RSSignature;
    onSubmit?: (data: RSSignature) => void;
}

const AccountSignatureEditForm = (props: AccountSignatureEditFormProps) => {

    const [signature, setsignature] = useState<RSSignature>(props.signature);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(signature);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setsignature({
            ...signature,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <div style={{ margin: '0.25rem', width: '100%' }}>
                <TextFieldAtom
                    id="outlined-basic"
                    name="identification"
                    label="Ingrese el numero de cedula"
                    variant="standard"
                    color="primary"
                    type="text"
                    action={handleChange}
                    value={signature.identification}
                    placeholder="Ingrese el numero de cedula"
                />
            </div>
            <div style={{ margin: '0.25rem', width: '100%' }}>
                <Dropdown
                    backgroundColor={ColorPalette.TERNARY}
                    height='auto'
                    width='100%'
                    label='Estado'
                    items={statusItems}
                    onChange={(value) => setsignature({ ...signature, status: value })}
                />
            </div>
            <div style={{ margin: '0.25rem', width: '100%' }}>
                <Dropdown
                    backgroundColor={ColorPalette.TERNARY}
                    height='auto'
                    width='100%'
                    label='Rol'
                    items={rolItem}
                    onChange={(value) => setsignature({ ...signature, role: value })}
                />
            </div>
            <SizeButton
                palette={{ backgroundColor: ColorPalette.PRIMARY }}
                style={ButtonStyle.MEDIUM}
                text='Editar'
                submit />
        </Box>
    )
}

export default AccountSignatureEditForm