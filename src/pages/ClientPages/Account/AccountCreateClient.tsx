import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, CardContent } from '@mui/material';
import BanQuitoLogo from '../../../assets/BanQuito-Logo.svg';
import StripeAtom from '../../../components/atoms/StripeAtom';
import AccountFormBank from '../../../components/organisms/Account/AccountFormBank';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import { AccountService } from '../../../services/account/AccountService';
import { RQCreateAccount } from '../../../services/account/dto/RQCreateAccount';
import { ProductService } from '../../../services/product/productService';
import { ColorPalette } from '../../../style/ColorPalette';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import { Spinner } from '../../../components/atoms/Spinner';
import { useUser } from '../../../context/UserContext';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';
import { AlertColor } from '@mui/material';


const entityBankCode = 'aef0fadf647c8d6f';
const internationalBankCode = 'c88c1afde4c3a564';
const codeBranch = '252';

const AccountCreateClient = () => {

    const user = useUser();

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [products, setproducts] = useState<any[] | undefined>([]);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [accountData, setaccountData] = useState<RQCreateAccount>();
    const [activateSpinner, setActivateSpinner] = useState(false);
    const navigate = useNavigate();
    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    useEffect(() => {
        getProducts("6c24027751bc43c5b232242e307880a7");
        return () => { }
    })


    const getProducts = async (id: string) => {
        setActivateSpinner(true);
        const productsAsync = await ProductService.getProducts(id);
        settitleSnack("Productos");
        setmessageSnack("Productos cargados correctamente");
        setcolorSnack("success");
        setopenSnack(true);
        setproducts(productsAsync);
        setActivateSpinner(false);
    }

    const handleSubmit = (data: any) => {
        const account: RQCreateAccount = {
            ...data,
            entityBankCode: entityBankCode,
            internationalBankCode: internationalBankCode,
            codeBranch: codeBranch,
            codeProductType: "6c24027751bc43c5b232242e307880a7",
        };
        setaccountData(account);
        saveAccount(account);
    }

    const saveAccount = async (data: RQCreateAccount) => {
        setisLoading(true);
        try {
            console.log(data);
            await AccountService.postAccount(data);
            settitleSnack("Cuenta");
            setmessageSnack("Cuenta creada correctamente");
            setcolorSnack("success");
            setopenSnack(true);
            navigate('/cliente');
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
            settitleSnack("Cuenta");
            setmessageSnack("Error al crear la cuenta");
            setcolorSnack("error");
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
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
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                height: "90vh"
            }}>
                <StripeAtom x={'calc(73% - 5px/2)'} y={'0'} width={'5px'} height={'100%'} color={ColorPalette.PRIMARY} />
                <StripeAtom x={'calc(72% - 10px/2)'} y={'0'} width={'10px'} height={'100%'} color={'#EEEEEE'} />
                <StripeAtom x={'calc(70% - 20px/2)'} y={'0'} width={'20px'} height={'100%'} color={ColorPalette.SECONDARY} />

                <StripeAtom x={'calc(50% - 250px/2)'} y={'0'} width={'250px'} height={'100%'} color={'#D9D9D9'} />

                <StripeAtom x={'calc(30% - 20px/2)'} y={'0'} width={'20px'} height={'100%'} color={ColorPalette.SECONDARY} />
                <StripeAtom x={'calc(28% - 10px/2)'} y={'0'} width={'10px'} height={'100%'} color={'#EEEEEE'} />
                <StripeAtom x={'calc(27% - 5px/2)'} y={'0'} width={'5px'} height={'100%'} color={ColorPalette.PRIMARY} />
                <Card variant="elevation"
                    elevation={10}
                    sx={{
                        width: 500,
                        borderRadius: 5,
                        position: 'relative'
                    }}>
                    <CardContent>
                        <AccountFormBank
                            onSubmit={handleSubmit}
                            products={products ? products : []}
                            identification={user.identification}
                            identificationType={user.identificationType} />
                    </CardContent>
                    <div style={{ margin: '0.5rem', position: 'absolute', bottom: 0, right: 0 }}>
                        <Avatar src={BanQuitoLogo} variant="square" />
                    </div>
                </Card>
            </div>
            <LoadOrganism active={isLoading} />
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => { setactiveErrorModal(false); navigate('/cliente') }}
                text={`${errorMessage}. ¿Desea volver a intentar?`}
                enableButtonBox
                onConfirm={() => saveAccount(accountData as RQCreateAccount)}
                onReject={() => navigate('/cliente')}
            />
        </>
    )
}

export default AccountCreateClient