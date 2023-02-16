import React, { useEffect, useState } from 'react'
import OnConstructionMolecule from '../../../components/molecules/OnConstructionMolecule'
import { AlertColor, Box } from '@mui/material'
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule'
import LoadOrganism from '../../../components/organisms/LoadOrganism'
import { AssociatedService } from '../../../services/product/AssociatedService.service'
import ServiceCardOrganism from '../../../components/organisms/ServiceCardOrganism'
import { AssociatedServiceRSRQ } from '../../../services/product/dto/AssociatedServiceRSRQ'

const AccountServicesPage = () => {

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [titleSnack, settitleSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('info');

    const [isLoading, setisLoading] = useState(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [services, setservices] = useState<AssociatedServiceRSRQ[]>([]);
    const [selectedService, setselectedService] = useState<AssociatedServiceRSRQ | undefined>();

    useEffect(() => {
        retriveAllServices();
        return () => { }
    }, []);

    const retriveAllServices = async () => {
        setisLoading(true);
        try {
            const data: AssociatedServiceRSRQ[] = (await AssociatedService.getAssociatedServices())
            setservices(data);
        } catch (error: any) {
            setmessageSnack("Ha ocurrido un error");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleServiceSelection = (service: AssociatedServiceRSRQ) => {
        setselectedService(service);
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                {!selectedService ? <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap',
                        maxWidth: 700
                    }}>
                    {
                        services.map((service, index) => {
                            return <ServiceCardOrganism
                                onClick={handleServiceSelection}
                                service={service} />
                        })
                    }
                </Box> : <OnConstructionMolecule />}
            </Box>
            <LoadOrganism
                active={isLoading}
                text={messageLoading} />
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
        </>
    )
}

export default AccountServicesPage