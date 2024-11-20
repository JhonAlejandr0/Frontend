import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de Toastify
import PerfilUser from "./PerfilUser";
import { Spinner } from "react-bootstrap";
export default function Perfil({ setRol }) {
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const verificarUsuario = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("usuario"));

        const response = await fetch(
          `${process.env.REACT_APP_API_USUARIO}/verificar/${token}`
        );
        if (response.ok) {
          setUsuario(JSON.parse(localStorage.getItem("usuario")));

          return;
        } else {
          // Manejar el caso en que la verificación falle
          localStorage.removeItem("usuario");
          setRol(null);
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
        localStorage.removeItem("usuario");
      }
    };

    verificarUsuario();
  }, [navigate, setRol]);

  if (!usuario) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <button className="botonVolver" onClick={() => navigate("/")}>
        <i className="fa-solid fa-arrow-left" />
      </button>
      <PerfilUser usuarioCompleto={usuario} setRol={setRol} />
      {/* Contenedor de Toastify para mostrar las notificaciones */}
      <ToastContainer />
    </div>
  );
}
