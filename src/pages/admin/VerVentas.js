import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "react-bootstrap";
import customStyles from "../../styles/style";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const columns = [
  {
    name: "ID VENTA",
    selector: (row) => row.idVenta,
  },
  {
    name: "Cliente",
    selector: (row) => row.cliente,
  },
  {
    name: "Estado",
    selector: (row) => row.estadoVenta,
  },
  {
    name: "Metodo de pago",
    selector: (row) => row.metodoPagoVenta,
  },
  {
    name: "Valor total",
    selector: (row) => row.valorTotal,
  },
  {
    name: "Ver más detallles",
    selector: (row) => row.verDetalles,
  },
];
export const VerVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    obtenerVentas();
  }, []);

  const obtenerVentas = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_ADMIN +
          "ventas/" +
          JSON.parse(localStorage.getItem("usuario")).documento
      );
      console.log(response.data);
      response.data.map((venta) => {
        venta.verDetalles = (
          <Link to={"/verVentas/" + venta.idVenta}>
            <button className="bg-blue-500 w-full p-2 text-white">
              Ver detalles
            </button>
          </Link>
        );
      });
      setVentas(response.data);

      setLoading(false);
    } catch (error) {
      console.error("No se pudo obtener los productos:", error);
    }
  };
  return (
    <div>
      <button className="botonVolver" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left" />
      </button>
      <div className="containerF">
        <div className="mainF-content flex flex-col  justify-center space-x-2">
          <h1 className="let2  text-2xl text-orange-500">Detalle del pedido</h1>
          <DataTable
            columns={columns}
            data={ventas}
            progressPending={loading}
            pagination
            highlightOnHover
            progressComponent={<Spinner animation="border" />}
            customStyles={customStyles}
            noDataComponent={
              <p className="text-orange-500 text-2xl font-black uppercase">
                No hay ventas
              </p>
            }
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
