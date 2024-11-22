import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { Spinner } from "react-bootstrap";
import customStyles from "../../styles/style";
import axios from "axios";
import { formatearFechaHora } from "../../helpers/format";
const columns = [
  {
    name: "ID PRODUCTO",
    selector: (row) => row.idProductos,
  },
  {
    name: "Nombre",
    selector: (row) => row.nombreProducto,
  },
  {
    name: "Cantidad",
    selector: (row) => row.cantidad,
  },
  {
    name: "Imagen",
    selector: (row) => row.imagen,
  },
];

const VerDetallePedido = () => {
  const { idPedido } = useParams();
  const [productos, setProducto] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [fecha, setFecha] = useState(Date.now());

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    obtenerProductos();
  }, []);
  const obtenerProductos = async () => {
    // Lógica para obtener los productos
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_DOMICILIARIO + "/pedido/" + idPedido,
        {
          documento: JSON.parse(localStorage.getItem("usuario")).documento,
        }
      );
      response.data[0].map((producto) => {
        producto.imagen = (
          <img
            src={"/IMG/" + producto.foto_URL}
            alt={producto.nombreProducto}
            className="w-20 h-20"
          />
        );
      });

      setProducto(response.data[0]);
      setValorTotal(response.data[1].valorTotal);
      setFecha(formatearFechaHora(response.data[1].fechaVenta));
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los productos", error);

      setLoading(false);
    }
  };
  return (
    <div>
      <button className="botonVolver" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left" />
      </button>
      <div className="containerFf back5">
        <div className="mainF-contentt">
          <h1 className="let2  text-2xl text-orange-500" style={{ marginBottom: "30px" }}>Detalle del pedido</h1>
          <DataTable
            columns={columns}
            data={productos}
            progressPending={loading}
            pagination
            highlightOnHover
            progressComponent={<Spinner animation="border" />}
            customStyles={customStyles}
            noDataComponent={
              <p className="text-orange-500 text-2xl font-black uppercase">
                No se pudo mostar detalles del pedido
              </p>
            }
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerDetallePedido;
