import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import TransferAmountForm from '../../../components/organisms/Transaction/TransferAmountForm';
import TransferDataForm from '../../../components/organisms/Transaction/TransferDataForm';
import { AccountService } from '../../../services/account/AccountService';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { RQTransaction } from '../../../services/transaction/dto/RQTransaction';
import { ColorPalette } from '../../../style/ColorPalette';
import { Spinner } from '../../../components/atoms/Spinner';
import { AlertColor } from '@mui/material';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';


const TransferClient = () => {
    const [activateSpinner, setActivateSpinner] = useState(false);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);

    const navigate = useNavigate();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [value, setvalue] = useState<RQTransaction>({
        codeInternationalAccount: "db6dae82faeff5f13d9d0ecb6e0b7d5f49",
        codeLocalAccount: "22cf89573e25a91bffbb",
        concept: "Transferencia directa",
        description: "Nota Debito",
        movement: "NOTA DEBITO",
        recipientAccountNumber: "61628076a76056a00aea",
        recipientBank: "BANQUITO",
        recipientType: "ORDENANTE",
        type: "TRANSFERENCIA",
        value: 0
    });

    const handleAccept = async () => {
        try {
            setActivateSpinner(true);
            const accountSimple: RSAccount | undefined = (await AccountService.getAccountByCode(value.recipientAccountNumber)).data.data;

            if (!accountSimple) {
                setActivateSpinner(false);
                console.log("Ha ocurrido un error");
                return;
                settitleSnack("Error");
                setmessageSnack("Ha ocurrido un error");
                setcolorSnack('error');
                setopenSnack(true);
            }
            await TransactionService.postTransaction(value);
            const aux = value;
            aux.codeLocalAccount = accountSimple.codeLocalAccount;
            aux.codeInternationalAccount = accountSimple.codeInternationalAccount;
            aux.recipientAccountNumber = value.codeLocalAccount;
            aux.movement = 'NOTA CREDITO';
            aux.value = value.value;
            settitleSnack("Exito");
            setmessageSnack("Se ha realizado la transferencia");
            setcolorSnack('success');
            setopenSnack(true);

            await TransactionService.postTransaction(aux);
            console.log(value);
            navigate('/cliente');
            setActivateSpinner(false);
            settitleSnack("Exito");
            setmessageSnack("Se ha realizado la transferencia");
            setcolorSnack('success');
            setopenSnack(true);

        } catch (error: any) {
            setActivateSpinner(false);
            setactiveErrorModal(true);
            seterrorMessage(error.message);
            settitleSnack("Error");
            setmessageSnack("Ha ocurrido un error");
            setcolorSnack('error');
            setopenSnack(true);
        }
    }

    const handleDecline = () => {
        navigate('/usuario');
    }

    return (
        <>
        <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
            {activateSpinner ? <Spinner /> : null}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ marginBottom: 50 }}>
                    <ProgressButtonMolecule
                        color={ColorPalette.PRIMARY}
                        itemsCount={4}
                        current={indexForm}
                        onUpdate={(value) => setindexForm(value)}
                    />
                </div>
                <Box sx={{
                    width: 500,
                }}>
                    {indexForm === 0 ?
                        <TransferDataForm
                            key={0}
                            showConcept
                            showDescription
                            onSubmit={(data: any) => {
                                setindexForm(1);
                                setvalue({
                                    ...value,
                                    description: data.description
                                });
                            }}
                            title='Cuenta(Receptor)' /> : indexForm === 1 ?
                            <TransferDataForm
                                key={1}
                                showAccountCode
                                onSubmit={(data: any) => {
                                    setindexForm(2);
                                    setvalue({
                                        ...value,
                                        recipientAccountNumber: data.accountNumber
                                    });
                                }}
                                title='Cuenta(Receptor)' /> :
                            indexForm === 2 ?
                                <TransferAmountForm
                                    onSubmit={(data: any) => {
                                        setindexForm(3);
                                        setvalue({
                                            ...value,
                                            value: data.amount
                                        })
                                    }} />
                                :
                                <ConfirmTransferUserForm
                                    title="Transferir"
                                    showField
                                    onAccept={() => handleAccept()}
                                    onDecline={() => handleDecline()}
                                    data={value} />}
                </Box>
            </div>
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => setactiveErrorModal(false)}
                text={errorMessage} />
        </>
    )
}

export default TransferClient