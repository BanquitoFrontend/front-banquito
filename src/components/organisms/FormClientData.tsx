import React, { useState } from "react";
import LabelInputMolecule from "../molecules/InputLabelMolecule";

const FormClientData = () => {
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [carrera, setCarrera] = useState("");
  const [lugarTrabajo, setLugarTrabajo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [referencia, setReferencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [segmento, setSegmento] = useState("");

  return (
    <form>
      <div className="left-side">
        <LabelInputMolecule
          text="Correo:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={true}
        />
        <LabelInputMolecule
          text="Fecha de Nacimiento:"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          disabled={true}
        />
        <LabelInputMolecule
          text="Género:"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          disabled={true}
        />
        <LabelInputMolecule
          text="Carrera:"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
          disabled={true}
        />
        <LabelInputMolecule
          text="Lugar de Trabajo:"
          value={lugarTrabajo}
          onChange={(e) => setLugarTrabajo(e.target.value)}
          disabled={true}
        />
        <LabelInputMolecule
          text="Estado Civil:"
          value={estadoCivil}
          onChange={(e) => setEstadoCivil(e.target.value)}
          disabled={true}
        />
        <LabelInputMolecule
          text="Referencia:"
          value={referencia}
          onChange={(e) => setReferencia(e.target.value)}
          disabled={true}
        />
      </div>
      <div className="right-side">
        <LabelInputMolecule
          text="Teléfono:"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          disabled={true}
        />
        <LabelInputMolecule
          text="Dirección:"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          disabled={true}
        />
        <LabelInputMolecule
          text="Segmento:"
          value={segmento}
          onChange={(e) => setSegmento(e.target.value)}
          disabled={true}
        />
      </div>
    </form>
  );
};

export default FormClientData;