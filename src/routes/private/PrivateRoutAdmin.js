import React from "react";
import ActualizacionUsuarios from "../../pages/admin/ActualizacionUsuarios";
import ActualizarProducto from "../../pages/admin/ActualizarProducto";
import FormularioRegistroU from "../../pages/admin/FormularioRegistroU";
import IndexAdmin from "../../pages/admin/IndexAdmin";
import ListaProducto from "../../pages/admin/ListaProducto";
import ListaUsuarios from "../../pages/admin/ListaUsuarios";
import RegistroProducto from "../../pages/admin/RegistroProducto";
import VerUsuario from "../../pages/admin/VerUsuario";
import { Routes, Route } from "react-router-dom";
import Perfil from "../../pages/perfil";
import Dedicamos from "../../pages/Dedicamos";

import VerProducto from "../../pages/admin/VerProducto";
import { Navigate } from "react-router-dom";
import { VerVentas } from "../../pages/admin/VerVentas";
import DetalleVenta from "../../pages/admin/DetalleVenta";
function PrivateRoutAdmin({ children, setRol }) {
  return (
    <Routes>
      <Route path="/actualizarProducto" element={<ActualizarProducto />} />
      <Route path="/ListaUsuarios" element={<ListaUsuarios />} />
      <Route
        path="/formularioRegistroUsuario"
        element={<FormularioRegistroU />}
      />
      <Route
        path="/actualizacionUsuarios/:documento"
        element={<ActualizacionUsuarios />}
      />
      <Route
        path="/actualizarProducto/:idProductos"
        element={<ActualizarProducto />}
      />
      <Route path="/verUsuario/:documento" element={<VerUsuario />} />
      <Route path="/registroProducto" element={<RegistroProducto />} />
      <Route path="/IndexAdmin" element={<IndexAdmin />} />
      <Route path="/listaProducto" element={<ListaProducto />} />
      <Route path="/perfil" element={<Perfil setRol={setRol} />} />
      <Route path="/dedicamos" element={<Dedicamos />} />
      <Route path="/verProducto/:idProductos" element={<VerProducto />} />
      <Route path="*" element={<Navigate to="/IndexAdmin" />} />
      <Route path="/verVentas" element={<VerVentas></VerVentas>} />
      <Route path="/verVentas/:idVenta" element={<DetalleVenta />} />
    </Routes>
  );
}

export default PrivateRoutAdmin;
