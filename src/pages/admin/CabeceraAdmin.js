import React from "react";
import { Link } from "react-router-dom";

const CabeceraAdmin = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to="/indexAdmin">
          <img src="../IMG/Logo.jfif" alt="Logo El Pan de la Abuela" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dedicamos#NuestraUbicacion">NUESTRA UBICACIÓN</Link>
          </li>
          <li>
            <Link to="/">PRODUCTOS</Link>
            <ul>
              <li>
                <Link to="/listaProducto">Consultar Producto</Link>
              </li>
              <li>
                <Link to="/RegistroProducto">Crear Producto</Link>
              </li>
            </ul>
          </li>
          <li>
            USUARIOS
            <ul>
              <li>
                <Link to="/ListaUsuarios">Consultar Usuario</Link>
              </li>
              <li>
                <Link to="/FormularioRegistroUsuario">Crear Usuario</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/verVentas" className="uppercase">
              Ver ventas
            </Link>
          </li>
        </ul>
      </nav>
      <div className="icon-container">
        <Link to="/perfil">
          <img src="../IMG/logeado.png" alt="Icono de Usuario" />
        </Link>
      </div>
    </header>
  );
};

export default CabeceraAdmin;
