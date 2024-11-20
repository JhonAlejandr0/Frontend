import React, { useEffect, useState } from "react";
import customStyles from "../../styles/style";
import DataTable from "react-data-table-component";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
const columns = [
  {
    name: "Nombre del domiciliario",
    selector: (row) => row.domiciliario,
  },

  {
    name: "Telefono",
    selector: (row) => row.telefono,
  },
  {
    name: "Direccion de entrega",
    selector: (row) => row.direccion,
  },
  {
    name: "Precio del pedido",
    selector: (row) => row.pago,
  },
  {
    name: "Fecha de pedido",
    selector: (row) => row.fechaPedido,
  },
  {
    name: "Estado pedido",
    selector: (row) => row.estadoPedido,
  },
  {
    name: "Detalles",
    selector: (row) => row.detalles,
  },
];
const Pedidos = () => {
  const [loading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    obtenerPedidosUsuario();
  }, []);

  const obtenerPedidosUsuario = async () => {
    try {
      const response = await axios(
        process.env.REACT_APP_API_CLIENTE +
          "/pedidos/" +
          JSON.parse(localStorage.getItem("usuario")).documento
      );
      const agregarVerDetalles = response.data.map((pedido) => {
        return {
          ...pedido,
          detalles: (
            <Link to={"/pedido/" + pedido.idPedido}>
              <button className="bg-orange-400 p-1 rounded-lg text-white hover:opacity-80">
                Ver detalles
              </button>
            </Link>
          ),
        };
      });

      setPedidos(agregarVerDetalles);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setPedidos([]);
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="botonVolver" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left" />
      </button>
      <main className="mainAU">
        <div className="search-bar"></div>
        <DataTable
          columns={columns}
          data={pedidos}
          progressPending={loading}
          pagination
          highlightOnHover
          progressComponent={<Spinner animation="border" />}
          customStyles={customStyles}
          noDataComponent={
            <p className="text-orange-500 text-2xl font-black uppercase">
              No hay pedidos disponibles
            </p>
          }
        />
      </main>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Pedidos;
