/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../helpers/format";
import { Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import customStyles from "../../styles/style";
const URI = process.env.REACT_APP_API_USUARIO;

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busquedaUsuario, setBusquedaUsuario] = useState("");

  useEffect(() => {
    getUsuarios();
    setLoading(false);
  }, []);

  const columns = [
    { name: "Documento", selector: (row) => row.documento },
    { name: "Nombre", selector: (row) => row.NombreCompleto, sortable: true },
    { name: "Correo", selector: (row) => row.correo },
    { name: "Telefono", selector: (row) => row.telefono },
    { name: "Direccion", selector: (row) => row.direccion },
    { name: "Rol", selector: (row) => row.rol },

    { name: "Acciones", selector: (row) => row.acciones },
  ];
  // Obtener la lista de usuarios
  const getUsuarios = async () => {
    try {
      const res = await axios.get(URI);

      const agregandoAcciones = res.data.map((usuario) => ({
        ...usuario,
        acciones: (
          <>
            <button
              onClick={() => deleteUsuario(usuario.documento)}
              className="btn-small eliminar"
            >
              X
            </button>

            <button className="btn-small ver">
              <Link to={`/verUsuario/${usuario.documento}`}>Ver</Link>
            </button>
          </>
        ),
      }));
      setUsuarios(agregandoAcciones);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // Eliminar usuario
  const deleteUsuario = async (documento) => {
    try {
      await axios.delete(`${URI}/${documento}`);
      getUsuarios(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    if (!busquedaUsuario) {
      getUsuarios();
      return;
    }
    const regex = new RegExp(busquedaUsuario, "i");
    const usuariosConFiltro = usuarios.filter(
      (usuario) =>
        regex.test(usuario.documento.toString()) ||
        regex.test(usuario.NombreCompleto) ||
        regex.test(usuario.correo) ||
        regex.test(usuario.telefono) ||
        regex.test(usuario.direccion) ||
        regex.test(usuario.rol)
    );
    setUsuarios(usuariosConFiltro);
  }, [busquedaUsuario]);

  return (
    <div>
      <main className="mainAU">
        <h1>Búsqueda de usuario específico por cualquier campo:</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Ingrese criterio de búsqueda"
            value={busquedaUsuario}
            onChange={(e) => setBusquedaUsuario(e.target.value)}
          />
        </div>
        <DataTable
          columns={columns}
          data={usuarios}
          progressPending={loading}
          pagination
          highlightOnHover
          progressComponent={<Spinner animation="border" />}
          customStyles={customStyles}
        />
      </main>
    </div>
  );
}
