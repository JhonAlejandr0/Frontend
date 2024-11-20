import React from "react";
import { Route, Routes } from "react-router-dom";
import CCompras from "../../pages/user/CCompras";
import DatosPago from "../../pages/user/DatosPago";
import Factura from "../../pages/user/Factura";
import InformacionPersonalConsulta from "../../pages/InformacionPersonalConsultar";
import MetodosPago from "../../pages/user/MetodosPago";
import Login from "../../pages/Login";
import Perfil from "../../pages/perfil";
import Dedicamos from "../../pages/Dedicamos";
import Formulario from "../../pages/Formulario";
import Home from "../../pages/Home";
import Catalogo from "../../pages/user/Catalogo";
import DescripcionP from "../../pages/user/DescripcionP";
import VerProducto from "../../pages/admin/VerProducto";
import { Navigate } from "react-router-dom";
import OlvidarPassword from "../../pages/user/OlvidarPassword";
import Recuperar from "../../pages/user/Recuperar";
import { useState } from "react";
import Pedidos from "../../pages/user/Pedidos";
import VerPedido from "../../pages/user/VerPedido";
const PrivateRoutUser = ({ rol, setRol }) => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  return (
    <>
      <Routes>
        <Route
          path="/informacionPersonalConsulta"
          element={<InformacionPersonalConsulta />}
        />
        <Route path="/C_Compras" element={<CCompras rol={rol} />} />
        <Route path="/datosPago" element={<DatosPago />} />
        {rol === null ? null : (
          <>
            <Route path="/factura" element={<Factura />} />
            <Route path="/metodosPago" element={<MetodosPago />} />
          </>
        )}
        <Route path="/cataPostres" element={<Catalogo categoria="postres" />} />
        <Route path="/cataBebidas" element={<Catalogo categoria="bebidas" />} />
        <Route
          path="/C_Compras/:idProductos"
          element={<CCompras rol={rol} />}
        />
        <Route path="/login" element={<Login setRol={setRol} />} />
        <Route path="/perfil" element={<Perfil setRol={setRol} />} />
        <Route path="/dedicamos" element={<Dedicamos />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo categoria="panes" />} />
        <Route path="/descripcion" element={<DescripcionP />} />
        <Route path="/verproducto" element={<VerProducto />} />
        <Route path="/verProducto/:idProductos" element={<VerProducto />} />
        <Route path="/descripcion-P/:idProductos" element={<DescripcionP />} />
        <Route
          path="/forgetPassword"
          element={
            <OlvidarPassword
              setEmail={setEmail}
              email={email}
              token={token}
              setToken={setToken}
            ></OlvidarPassword>
          }
        />
        <Route path="/Recuperar/:token" element={<Recuperar />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/pedido/:idPedido" element={<VerPedido />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default PrivateRoutUser;
