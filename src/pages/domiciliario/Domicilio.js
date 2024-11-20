/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "react-bootstrap";
import customStyles from "../../styles/style";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
export default function Domicilio() {
  const [domicilios, setDomicilios] = useState([]);
  const [busquedaDomicilio, setBusquedaDomicilio] = useState("");
  const [loading, setLoading] = useState(true);
  const columns = [
    { name: "ID", selector: (row) => row.idPedido },
    { name: "Dirección", selector: (row) => row.direccion },
    { name: "Pago del domicilio", selector: (row) => row.pago },
    { name: "Pago a recibir", selector: (row) => row.valorTotal },
    { name: "Estado", selector: (row) => row.estado },
    { name: "Acción", selector: (row) => row.accion },
  ];
  useEffect(() => {
    getDomicilios();
  }, []);
  const agregarDomicilio = async (e, idPedido) => {
    e.preventDefault();
    try {
      await axios.put(
        process.env.REACT_APP_API_DOMICILIARIO + "/agregar/" + idPedido,
        { documento: JSON.parse(localStorage.getItem("usuario")).documento }
      );
      eliminar(idPedido);
      toast.success("Domicilio agregado correctamente");
    } catch (error) {
      toast.error("Error al agregar el domicilio");
    }
  };
  const eliminar = async (item, id) => {
    const filtroDomicilios = domicilios.filter(
      (domicilio, index) => index !== item
    );
    setDomicilios(filtroDomicilios);
    try {
      await axios.put(
        process.env.REACT_APP_API_DOMICILIARIO + "/eliminar/" + id,
        { documento: JSON.parse(localStorage.getItem("usuario")).documento }
      );
    } catch (error) {
      toast.error("Error al eliminar el domicilio");
    }
  };
  const getDomicilios = async () => {
    // Lógica para mostrar los domicilios
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_DOMICILIARIO + "/domicilios",
        { documento: JSON.parse(localStorage.getItem("usuario")).documento }
      );

      const domicilios = res.data.map((domicilio, item) => ({
        ...domicilio,
        accion: (
          <>
            <div className="flex gap-1 flex-wrap p-2">
              <button
                className=" bg-orange-500 w-full p-2 text-white rounded-md hover:"
                onClick={(e) => agregarDomicilio(e, domicilio.idPedido)}
              >
                Aceptar
              </button>
              <button
                className="bg-red-500 w-full text-white p-2 rounded-md hover:"
                onClick={() => eliminar(item, domicilio.idPedido)}
              >
                Rechazar
              </button>
            </div>
          </>
        ),
      }));

      setDomicilios(domicilios);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <main className="mainP">
        <h1 className="tex-4xl text-orange-500">Búsqueda de domicilios 😊</h1>
        <div className="contentP">
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="¡Busque su pedido! 😊"
                value={busquedaDomicilio}
                onChange={(e) => setBusquedaDomicilio(e.target.value)}
              />
            </div>
            <DataTable
              columns={columns}
              data={domicilios}
              progressPending={loading}
              pagination
              highlightOnHover
              progressComponent={<Spinner animation="border" />}
              customStyles={customStyles}
              noDataComponent={
                <p className="text-orange-500 text-2xl font-black uppercase">
                  No hay pedidos pendientes
                </p>
              }
            />
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
