import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { formatCurrency, formatearFechaHora } from "../../helpers/format";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const DetalleVenta = () => {
  const navigate = useNavigate();
  const [productos, setProducto] = useState([]); // Función para calcular el valor total de la factura
  const [valorTotal, setValorTotal] = useState(0); // Función para calcular el valor total de la factura
  const [fecha, setFecha] = useState(Date.now()); // Función para calcular el valor total de la factura
  const [domicilio, setDomicilio] = useState(""); // Función para calcular el valor total de la factura
  const [loading, setLoading] = useState(true);
  const { idVenta } = useParams();
  useEffect(() => {
    obtenerProductos();
  }, []);
  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_ADMIN + "detalle/" + idVenta
      );
      setProducto(response.data[0]);
      setValorTotal(response.data[1].valorTotal);
      setFecha(formatearFechaHora(response.data[1].fechaVenta));
      setDomicilio(response.data[1].domiciliario);

      setLoading(false);
    } catch (error) {
      toast.error(error);
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
    <div className="back5">
      <button className="botonVolver" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left" />
      </button>
      <div className="containerF">
        <div className="mainF-content ">
          <h1 className="let2  text-2xl text-orange-500">
            Detalle de la compra
          </h1>
          <table className="invoiceF-info ">
            <tbody>
              <tr>
                <td>NIT: {idVenta}</td>
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
        <div className="mainF-content">
  {typeof domicilio === "string" ? (
    <p>{domicilio}</p>
  ) : (
    <div className="space-y-2 font-bold text-xl">
      <h1 className="letraa"style={{ marginBottom: "15px" }}>Datos del domiciliario</h1>
      <p>
        <span className="icon">👤</span> Nombre:{" "}
        <span className="font-light">{domicilio.NombreCompleto}</span>
      </p>
      <p>
        <span className="icon">📧</span> Correo:{" "}
        <span className="font-light">{domicilio.correo}</span>
      </p>
      <p>
        <span className="icon">🆔</span> Documento:{" "}
        <span className="font-light">{domicilio.documento}</span>
      </p>
      <p>
        <span className="icon">🏠</span> Dirección:{" "}
        <span className="font-light">{domicilio.direccion}</span>
      </p>
      <p>
        <span className="icon">📞</span> Teléfono:{" "}
        <span className="font-light">{domicilio.telefono}</span>
      </p>
    </div>
  )}
</div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default DetalleVenta;
