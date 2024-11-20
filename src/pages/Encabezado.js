import React from "react";
import HeaderUser from "./user/HeaderUser";
import Cabezaa from "./admin/CabeceraAdmin";
import CabezaDomiciliario from "./domiciliario/CabezaDomiciliario";
import HeaderGeneral from "./HeaderGeneral";

const Encabezado = ({ rol }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // Función para determinar qué encabezado mostrar
  const renderHeader = () => {
    if (rol === "Administrador") {
      return <Cabezaa />;
    }
    if (rol === "Domiciliario") {
      return <CabezaDomiciliario />;
    }

    if (rol === "Cliente") {
      return <HeaderUser />;
    }
    return <HeaderGeneral />;
  };

  return (
    <div>
      {renderHeader()} {/* Renderiza el encabezado correcto */}
    </div>
  );
};
export default Encabezado;
