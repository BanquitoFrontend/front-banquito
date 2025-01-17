import React, { useState } from 'react'
import BanQuitoLogo from '../../../assets/BanQuito-Logo.svg'
import { useNavigate } from 'react-router-dom';
import { Slide, Avatar } from '@mui/material';
import StripeAtom from '../../../components/atoms/StripeAtom';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import AccountFormBank from '../../../components/organisms/Account/AccountFormBank';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import SelectAccountTypeForm from '../../../components/organisms/SelectAccountTypeForm';
import { ProductService } from '../../../services/product/productService';
import { ColorPalette } from '../../../style/ColorPalette';
import { AccountService } from '../../../services/account/AccountService';
import { AlertColor } from '@mui/material';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';

const entityBankCode = 'aef0fadf647c8d6f';
const internationalBankCode = 'c88c1afde4c3a564';
const codeBranch = '252';

const AccountCreateUser = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState<string>("");
  const [indexForm, setindexForm] = useState<number>(0)
  const [selectedAccount, setselectedAccount] = useState<string>("");
  const [products, setproducts] = useState<any[] | undefined>([]);
  const [accountData, setaccountData] = useState<any>();
  const [activateSpinner, setActivateSpinner] = useState(false);
  const navigate = useNavigate();
  const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');
  const getProducts = async (id: string) => {
    setActivateSpinner(true);
    const productsAsync = await ProductService.getProducts(id);
    setproducts(productsAsync);
    setActivateSpinner(false);
    settitleSnack("Productos");
    setmessageSnack("Productos obtenidos correctamente");
    setcolorSnack("success");
    setopenSnack(true);
  }

  const handleTypeAccountButton = (data: string) => {
    setindexForm(1);
    setselectedAccount(data);
    getProducts(data);
  }

  const handleSubmit = (data: any) => {
    const account = {
      ...data,
      entityBankCode: entityBankCode,
      internationalBankCode: internationalBankCode,
      codeBranch: codeBranch,
      codeProductType: "2"
    };
    console.log(account);
    setaccountData(account);
    saveAccount(account);
  }

  const saveAccount = async (data: any) => {
    setisLoading(true);
    try {
      await AccountService.postAccount(data);
      navigate('/usuario');
      settitleSnack("Cuenta");
      setmessageSnack("Cuenta creada correctamente");
      setcolorSnack("success");
      setopenSnack(true);
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
      <ProgressButtonMolecule
        color={ColorPalette.PRIMARY}
        itemsCount={2}
        current={indexForm}
        onUpdate={(value) => setindexForm(value)} />
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: indexForm == 0 ? '1' : '0'
        }}>
          <Slide
            in={indexForm == 0}
            direction={indexForm == 0 ? "left" : "right"}
            mountOnEnter
            unmountOnExit>
            <div>
              <SelectAccountTypeForm
                onSelect={handleTypeAccountButton} />
              <StripeAtom x={'0'} y={'0'} width={'50px'} height='50px' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'50px'} y={'0'} width={'20px'} height='50px' color={ColorPalette.TERNARY} />
              <StripeAtom x={'75px'} y={'0'} width={'10px'} height='50px' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'90px'} y={'0'} width={'5px'} height='50px' color={ColorPalette.FOURTH} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, margin: 3 }}>
                <Avatar variant='square' src={BanQuitoLogo} sx={{ color: ColorPalette.ACCENT }} />
              </div>
            </div>
          </Slide>
        </div>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: indexForm == 1 ? '1' : '0'
        }}>
          <Slide
            in={indexForm == 1}
            direction={indexForm == 1 ? "left" : "right"}
            mountOnEnter
            unmountOnExit>
            <div>
              <div style={{ position: 'absolute', right: '10%', top: 0, zIndex: 2 }}>
                <AccountFormBank
                  products={products ? products : []}
                  onSubmit={handleSubmit} />
              </div>
              <StripeAtom x={'160px'} y={'0'} width={'250px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'155px'} y={'0'} width={'250px'} height='100%' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'150px'} y={'0'} width={'250px'} height='100%' color={'#D9D9D9'} />
              <StripeAtom x={'30px'} y={'0'} width={'100px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'25px'} y={'0'} width={'100px'} height='100%' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'430px'} y={'0'} width={'100px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'425px'} y={'0'} width={'100px'} height='100%' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'555px'} y={'0'} width={'50px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'550px'} y={'0'} width={'50px'} height='100%' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'615px'} y={'0'} width={'25px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'610px'} y={'0'} width={'25px'} height='100%' color={ColorPalette.PRIMARY} />
              <div style={{ position: 'absolute', bottom: 'calc(50% - 100px)', left: 'calc(150px + 20px)', margin: 3 }}>
                <Avatar variant='square' src={BanQuitoLogo} sx={{ color: ColorPalette.ACCENT, width: '200px', height: '200px' }} />
              </div>
            </div>
          </Slide>
        </div>
      </div>
      <LoadOrganism active={isLoading} />
      <ErrorModalOrganism
        active={activeErrorModal}
        onDeactive={() => { setactiveErrorModal(false); navigate('/usuario') }}
        text={`${errorMessage}. ¿Desea volver a intentar?`}
        enableButtonBox
        onConfirm={() => saveAccount(accountData)}
        onReject={() => navigate('/usuario')}
      />
    </>
  )
}

export default AccountCreateUser
