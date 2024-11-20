/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Spinner, Toast } from "react-bootstrap";
import customStyles from "../../styles/style";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
export default function PedidosPendientes() {
  const [loading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  const columns = [
    { name: "ID", selector: (row) => row.idPedido },
    { name: "Nombre", selector: (row) => row.nombreCliente },
    { name: "Télefono", selector: (row) => row.telefonoCliente },

    { name: "Dirección", selector: (row) => row.direccion },
    {
      name: "Pago",
      selector: (row) => row.valorTotal,
    },

    { name: "Estado", selector: (row) => row.estadoPedido },
    { name: "Acción", selector: (row) => row.accion },
    { name: "Ver detalles", selector: (row) => row.verdetalles },
  ];
  useEffect(() => {
    obtenerPedidosPendientes();
    setLoading(false);
  }, []);
  const eliminar = (item) => {
    const filtroPedidos = pedidos.filter((pedido) => pedido.idPedido !== item);
    setPedidos(filtroPedidos);
  };
  const cancelarPedido = async (idPedido) => {
    try {
      await axios.put(
        process.env.REACT_APP_API_DOMICILIARIO + "/cancelar/" + idPedido
      );
      eliminar(idPedido);
      toast.success("Pedido cancelado correctamente");
    } catch (error) {
      console.error("Error cancelando el pedido", error);
    }
  };
  const entregarPedido = async (idPedido) => {
    try {
      await axios.put(
        process.env.REACT_APP_API_DOMICILIARIO + "/entregar/" + idPedido,
        {
          documento: JSON.parse(localStorage.getItem("usuario")).documento,
        }
      );
      eliminar(idPedido);
      toast.success("Pedido entregado correctamente");
    } catch (error) {
      toast.error("Error al obtener los pedidos pendientes");
    }
  };
  const obtenerPedidosPendientes = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_DOMICILIARIO +
          "/pendientes/" +
          JSON.parse(localStorage.getItem("usuario")).documento
      );

      const domicilios = response.data.map((domicilio) => ({
        ...domicilio,
        accion: (
          <>
            <div className="flex gap-1 flex-wrap p-2">
              <button
                className=" bg-orange-500 w-full p-2 text-white"
                onClick={() => entregarPedido(domicilio.idPedido)}
              >
                Entregado
              </button>
              <button
                className="bg-red-500 w-full text-white"
                onClick={() => cancelarPedido(domicilio.idPedido)}
              >
                Cancelar
              </button>
            </div>
          </>
        ),
        verdetalles: (
          <Link to={"/verDetalle/" + domicilio.idPedido}>
            <button className="bg-blue-500 w-full p-2 text-white">
              Ver detalles
            </button>
          </Link>
        ),
      }));

      setPedidos(domicilios);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <main>
        <div className="">
          <section className="pedidos-pendientes">
            <h1 className="text-4xl text-center ">Pedidos Pendientes</h1>
            <DataTable
              columns={columns}
              progressPending={loading}
              progressComponent={<Spinner></Spinner>}
              pagination
              data={pedidos}
              highlightOnHover
              customStyles={customStyles}
              noDataComponent={
                <p className="text-orange-500 text-2xl uppercase font-black ">
                  NO HAY PEDIDOS DISPONIBLES
                </p>
              }
            ></DataTable>
          </section>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
