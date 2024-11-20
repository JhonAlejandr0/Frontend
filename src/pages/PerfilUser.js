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
    <div className="w-1/2 block mx-auto my-10 border-3 p-5 border-orange-500 border-dotted rounded-lg">
      <h1 className="text-orange-500 text-2xl">Perfil de Usuario</h1>
      <div className="p-2 space-y-2">
        <p className="font-black">
          Nombre Completo: <span className="font-normal">{NombreCompleto}</span>
        </p>
        <p className="font-black">
          Correo Electrónico: <span className="font-normal">{correo}</span>
        </p>
        <p className="font-black">
          Teléfono: <span className="font-normal">{telefono}</span>
        </p>
        <p className="font-black">
          Dirección: <span className="font-normal">{direccion}</span>
        </p>
        <p className="font-black">
          Usuario: <span className="font-normal">{usuario}</span>
        </p>
        <p className="font-black">
          Rol: <span className="font-normal">{rol}</span>
        </p>
      </div>
      <button onClick={handleLogout} className="bg-orange-500 text-white">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default PerfilUser;
