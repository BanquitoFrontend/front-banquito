import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import { ColorPalette } from '../../../style/ColorPalette';
import TransferDataForm from '../../../components/organisms/TransferDataForm';
import TransferAmountForm from '../../../components/organisms/TransferAmountForm';
import { Box } from '@mui/material';
/* import { TransactionPost } from '../../../services/account/model/TransactionPost';
import { TransactionService } from '../../../services/account/transactionService'; */
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';

const TransferBank = () => {
    /* const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);

    const navigate = useNavigate();

    const [value, setvalue] = useState<TransactionPost>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "Nota Debito",
        description: "Nota Debito",
        movement: "Nota Debito",
        type: "",
        recipientAccountNumber: "",
        recipientBank: "",
        recipientType: "",
        value: 0
    });

    const handleAccept = async () => {
        try {
            await TransactionService.postTransaction(value);
            navigate('/usuario');
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
        }
    }

    const handleDecline = () => {
        navigate('/usuario');
    } */

    return (
        <>
            {/* <div style={{
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
                            key={1}
                            showAccountCode
                            showConcept
                            showDescription
                            onSubmit={(data: any) => {
                                setindexForm(1);
                                setvalue({
                                    ...value,
                                    concept: data.concept,
                                    description: data.description,
                                    codeLocalAccount: data.accountNumber,
                                    codeInternationalAccount: data.accountNumber,
                                    type: data.type
                                });
                            }}
                            title='Cuenta(Emisor)' /> :
                        indexForm === 1 ?
                            <TransferDataForm
                                key={2}
                                showAccountCode
                                onSubmit={(data: any) => {
                                    setindexForm(2);
                                    setvalue({
                                        ...value,
                                        recipientBank: data.bank,
                                        recipientAccountNumber: data.accountNumber,
                                        recipientType: data.type
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
                                    onAccept={() => handleAccept()}
                                    onDecline={() => handleDecline()}
                                    data={value} />}
                </Box>
            </div>
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => setactiveErrorModal(false)}
                text={errorMessage} /> */}
        </>
    )
}

export default TransferBank