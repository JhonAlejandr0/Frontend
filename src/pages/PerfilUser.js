import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PerfilUser = ({ usuarioCompleto, setRol }) => {
  const { NombreCompleto, correo, telefono, direccion, usuario, rol } =
    usuarioCompleto;
  const navigate = useNavigate();
  const handleLogout = () => {
    // Muestra una notificación en lugar de alert
    localStorage.removeItem("usuario");
    toast.success("Sesión cerrada con éxito");
    setTimeout(() => {
      navigate("/");
      setRol(null);
    }, [2000]); // Redirigir al login
  };
  return (
    <div className="perfil-container">
      <h1>Perfil de Usuario</h1>
      <div className="perfil-info">
        <p className="font-black">
          <span className="icon">👤</span> Nombre Completo:
          <span className="font-normal">{NombreCompleto}</span>
        </p>
        <p className="font-black">
          <span className="icon">📧</span> Correo Electrónico:
          <span className="font-normal">{correo}</span>
        </p>
        <p className="font-black">
          <span className="icon">📞</span> Teléfono:
          <span className="font-normal">{telefono}</span>
        </p>
        <p className="font-black">
          <span className="icon">🏠</span> Dirección:
          <span className="font-normal">{direccion}</span>
        </p>
        <p className="font-black">
          <span className="icon">👤</span> Usuario:
          <span className="font-normal">{usuario}</span>
        </p>
        <p className="font-black">
          <span className="icon">🛡️</span> Rol:
          <span className="font-normal">{rol}</span>
        </p>
      </div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
  
  
};

export default PerfilUser;
