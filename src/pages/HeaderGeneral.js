import React from "react";
import { Link } from "react-router-dom";
const HeaderGeneral = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src="../IMG/Logo.jfif" alt="Logo El Pan de la Abuela" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dedicamos#NuestraUbicacion">NUESTRA UBICACION</Link>
          </li>
          <li>
            <Link to="/">PRODUCTOS</Link>
          </li>
        </ul>
      </nav>
      <div className="icon-container">
        <Link to="/C_Compras">
          <img src="../IMG/Carrito.png" alt="Carrito de Compras" />
        </Link>
        <Link to="/login">
          <img src="../IMG/icono.jpg" alt="Icono de Usuario" />
        </Link>
      </div>
    </header>
  );
};

export default HeaderGeneral;
