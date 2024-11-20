/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const URI = process.env.REACT_APP_API_USUARIO; // Ajusta esta URI según tu API

export default function VerUsuario() {
  const [usuario, setUsuario] = useState(null);
  const { documento } = useParams(); // Obtener ID del usuario desde la URL

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await axios.get(`${URI}/${documento}`);
        setUsuario(res.data);
      } catch (error) {
        toast.error("No se pudo obtener el usuario");
      }
    };

    fetchUsuario();
  }, [documento]);

  if (!usuario) {
    // Mostrar un mensaje de carga mientras se obtiene el usuario
    return <Spinner animation="border" role="status" />;
  }

  return (
    <div>
      <main>
        <h1 className="main-h1">Información Personal</h1>
        <div className="content-ELUSU">
          <div className="form-sectionELUSU">
            <form className="formELUSU">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                value={usuario.NombreCompleto}
                disabled
              />

              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                value={usuario.usuario}
                disabled
              />

              <label htmlFor="correo">Correo</label>
              <input type="email" id="correo" value={usuario.correo} disabled />

              <label htmlFor="direccion">Dirección de residencia</label>
              <input
                type="text"
                id="direccion"
                value={usuario.direccion}
                disabled
              />

              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                value={usuario.telefono}
                disabled
              />

              <label htmlFor="rol">Rol</label>
              <input type="text" id="rol" value={usuario.rol} disabled />
            </form>
          </div>
          <div className="image-sectionELUSU">
            <img src="../IMG/Logo.jfif" alt="Logo El Pan De La Abuela" />
          </div>
        </div>
        <div className="button-sectionELUSU">
          <Link to={`/actualizacionUsuarios/${usuario.documento}`}>
            <button className="BotonEliminar">¿Actualizar?</button>
          </Link>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
