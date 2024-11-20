import React from "react";
import { Link } from "react-router-dom";

const CabezaDomiciliario = () => {
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
            <Link to="/dedicamos">NUESTRA UBICACION</Link>
          </li>
          <li>
            <Link to="/">BUSCAR PEDIDOS</Link>
          </li>
          <li>
            <Link to="/pedidosPendientes">PEDIDOS PENDIENTES</Link>
          </li>
        </ul>
      </nav>
      <div className="icon-container">
        <Link to="/perfil">
          <img src="../IMG/JhonQuizizIngles.png" alt="Icono de Usuario" />
        </Link>
      </div>
    </header>
  );
};

export default CabezaDomiciliario;
