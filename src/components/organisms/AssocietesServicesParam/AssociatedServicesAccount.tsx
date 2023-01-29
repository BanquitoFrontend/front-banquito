import { useState, useEffect } from "react";
import { SizeButton } from "../../atoms/SizeButton";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { Button, Typography } from "@mui/material";
import { Dropdown } from "../../atoms/Dropdown";
import TableMolecule from "../../molecules/TableMolecule";
import ButtonIcon from "../../atoms/ButtonIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { associatedServiceParamService } from "../../../services/product/AssociatedServiceParamService";
import { AssociatedService } from '../../../services/product/Model/AssociatedService';
import Modal from "@mui/material/Modal";
import React from "react";
import Box from "@mui/material/Box";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 20px;
  max-width: 500px;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 60px;
`;

export const AssociatedServicesAccount = () => {
  const initRow =[<>No existe Data</>]
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState("");
  const [row, setRow] = useState(initRow);
  const [branches, setBranches] = useState<AssociatedService[]>([]);
 
  const getData = async () => {
    fetch("http://localhost:8081/api/product/associatedServices")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => setBranches(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
    
  }, []);

  const headers = [
      <>ID</>,
      <>Nombre</>,
      <>Estado</>,
      <>Texto</>,
      <>Fecha</>,
      <>Numero</>,
      <>Fecha de Creacion</>,
      <>Fecha de Culminacion</>,
      <>Acciones</>
     
  ];




  console.log(branches)
  
  const rows =()=>{
    const aux:any = [];
    branches.forEach((branch) =>
    branch.params.forEach((account) =>
    account.account?.forEach(data =>aux.push([
      <>{branch.id}</>,
      <>{branch.name}</>,
      <>{data.status}</>,
      <>{data.textValue}</>,
      <>{data.dateValue}</>,
      <>{data.numberValue}</>,
      <>{data.createDate}</>,
      <>{data.endDate}</>,
      <>
      </>
    ])))
  );
  return aux;
  } 
  


  console.log(rows)


  const filterByValue = () => {
    if (value === "") return getData();
    else {
      const filtered = branches.filter((branch) => {
        return branch.id.includes(value);
      });
      return setBranches(filtered);
    }
  };


  return (
    <Container>
      <SearchContainer>
        <span>Nombre: </span>
        <TextFieldAtom
          id="id"
          label="Parametro Asociado"
          color="primary"
          type="text"
          placeholder="id"
          variant="standard"
          action={(event) => {
            setValue(event.target.value);
          }}
          value={value}
        />
        <SizeButton
          palette={{ backgroundColor: ColorPalette.PRIMARY }}
          icon={<SearchIcon />}
          onClick={() => console.log("Buscar")}
          text="Buscar"
          style={ButtonStyle.MEDIUM}
        />
      </SearchContainer>
      <Container>
         <TableMolecule headers={headers} rows={rows()} />
        <ButtonIcon
          color={ColorPalette.PRIMARY}
          icon={<ControlPointIcon />}
          onClick={() => handleOpen()}
          top={true}
        />  
        <SizeButton
          palette={{ backgroundColor: ColorPalette.PRIMARY }}
          onClick={() => console.log("Guardar")}
          text="Guardar"
          style={ButtonStyle.MEDIUM}
        />
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar Parametro de Servicio Asociado
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Container>
              <div>
                <SearchContainer>
                  <span>Nombre:</span>
                  <TextFieldAtom
                    id="id"
                    label="Parametro Asociado"
                    color="primary"
                    type="text"
                    placeholder="nombre"
                    variant="standard"
                    action={(event) => {}}
                    value=""
                  />
                </SearchContainer>
              </div>
              <div>
                <span>Tipo de Dato: </span>
                <Dropdown
                  label="Tipo de Dato"
                  items={[
                    { name: "TEX", value: "string" },
                    { name: "DAT", value: "date" },
                    { name: "NUM", value: "number" },
                    { name: "DEC", value: "float" },
                  ]}
                  width={200}
                  height={50}
                  selectedTextColor={ColorPalette.BLACK}
                />
              </div>
              <Container>
                <SizeButton
                  palette={{ backgroundColor: ColorPalette.PRIMARY }}
                  onClick={() => console.log("Guardar")}
                  text="Guardar"
                  style={ButtonStyle.MEDIUM}
                />
              </Container>
            </Container>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};