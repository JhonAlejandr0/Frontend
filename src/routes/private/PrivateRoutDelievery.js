import React from "react";
import { Routes, Route } from "react-router-dom";
import Domicilio from "../../pages/domiciliario/Domicilio";
import PedidosPendientes from "../../pages/domiciliario/PedidosPendientes";
import { Navigate } from "react-router-dom";
import Perfil from "../../pages/perfil";
import Dedicamos from "../../pages/Dedicamos";
import VerDetallePedido from "../../pages/domiciliario/VerDetallePedido";
const PrivateRoutDelievery = ({ setRol }) => {
  return (
    <Routes>
      <Route path="/" element={<Domicilio />} />
      <Route path="/perfil" element={<Perfil setRol={setRol} />} />

      <Route path="/pedidosPendientes" element={<PedidosPendientes />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/dedicamos" element={<Dedicamos />} />
      <Route path="/verDetalle/:idPedido" element={<VerDetallePedido />} />
    </Routes>
  );
};

export default PrivateRoutDelievery;
