import { formatCurrency, formatearFechaHora } from "../../helpers/format";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
export default function VerPedido() {
  const navigate = useNavigate();
  const [productos, setProducto] = useState([]); // Función para calcular el valor total de la factura
  const [valorTotal, setValorTotal] = useState(0); // Función para calcular el valor total de la factura
  const [fecha, setFecha] = useState(Date.now()); // Función para calcular el valor total de la factura

  const [loading, setLoading] = useState(true);
  const { idPedido } = useParams();
  useEffect(() => {
    obtenerProductos();
  }, []);
  const obtenerProductos = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_CLIENTE + "/pedido/" + idPedido,
        {
          documento: JSON.parse(localStorage.getItem("usuario")).documento,
        }
      );
      setProducto(response.data[0]);
      setFecha(response.data[1].fechaVenta);
      setValorTotal(response.data[1].valorTotal);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setTimeout(() => {
        navigate("/pedidos");
      }, 2000);
    }
  };
  if (loading) {
    return (
      <div className="spinner w-full flex justify-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <ToastContainer></ToastContainer>
      </div>
    );
  }
  return (
    <div>
      <button className="botonVolver" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left" />
      </button>
      <div className="containerF">
        <div className="mainF-content flex flex-col  justify-center space-x-2">
          <h1 className="let2  text-2xl text-orange-500">
            Detalle de la compra
          </h1>
          <table className="invoiceF-info ">
            <tbody>
              <tr>
                <td>NIT: 0000001</td>
                <td>DE: EL PAN DE LA ABUELA</td>
              </tr>
              <tr>
                <td>FECHA: {formatearFechaHora(fecha)[0]}</td>
                <td>HORA: {formatearFechaHora(fecha)[1]}</td>
              </tr>
            </tbody>
          </table>
          <table className="productF-info">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {/* Mostrar los productos del carrito */}
              {productos.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombreProducto}</td>
                  <td>{item.cantidad}</td>
                  <td>{formatCurrency(item.valorUnitario)}</td>
                  <td>{formatCurrency(item.valorUnitario * item.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totalF">
            <strong>Valor total:</strong> {formatCurrency(valorTotal)}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
