/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { Spinner } from "react-bootstrap";

const URI = process.env.REACT_APP_API_USUARIO; // Ajusta esta URI según tu API

export default function ActualizacionUsuarios() {
  const [usuario, setUsuario] = useState(null);
  const { documento } = useParams(); // Obtener ID del usuario desde la URL
  const navigate = useNavigate(); // Hook para redirigir
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await axios.get(`${URI}/${documento}`);

        setUsuario(res.data);
        setLoading(false);
      } catch (error) {
        console.error("No se pudo obtener el usuario:", error);
      }
    };

    fetchUsuario();
  }, [documento]);

  const handleUpdate = async () => {
    try {
      // Verifica la estructura del objeto que envías
      await axios.put(`${URI}/${documento}`, {
        ...usuario,
        resRol: "Administrador",
      });

      navigate("/ListaUsuarios"); // Redirige a la vista de la lista de usuarios después de la actualización
    } catch (error) {
      console.error("No se pudo actualizar el usuario:", error);
    }
  };

  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  return (
    <main>
      <h1 className="main-h1">Actualizar Información Personal</h1>
      <div className="content-ELUSU">
        <div className="form-sectionELUSU">
          <form
            className="formELUSU"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <label htmlFor="NombreCompleto">Nombre Completo</label>
            <input
              type="text"
              id="NombreCompleto"
              value={usuario?.NombreCompleto || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, NombreCompleto: e.target.value })
              }
            />

            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              value={usuario?.usuario || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, usuario: e.target.value })
              }
            />

            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              value={usuario?.correo || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, correo: e.target.value })
              }
            />

            <label htmlFor="direccion">Dirección de residencia</label>
            <input
              type="text"
              id="direccion"
              value={usuario?.direccion || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, direccion: e.target.value })
              }
            />

            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              value={usuario?.telefono || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, telefono: e.target.value })
              }
            />

            <label htmlFor="rol">Rol</label>
            <select
              name="rol"
              id="rol"
              onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
              value={usuario.rol}
            >
              <option value="Administrador">Administrador</option>
              <option value="Cliente">Cliente</option>
              <option value="Empleado">Empleado</option>
              <option value="Domiciliario">Domiciliario</option>
            </select>

            <button type="submit" className="BotonEliminar">
              Actualizar
            </button>
          </form>
        </div>
        <div className="image-sectionELUSU">
          <img src="../IMG/Logo.jfif" alt="Logo El Pan De La Abuela" />
        </div>
      </div>
    </main>
  );
}
