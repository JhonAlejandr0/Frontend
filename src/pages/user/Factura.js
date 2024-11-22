/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import { formatCurrency } from "../../helpers/format";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import { useParams } from "react-router-dom";

export default function Factura() {
  // Función para calcular el valor total de la factura
  const { carrito } = useContext(CarritoContext);
  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.precioProducto * item.cantidad,
      0
    );
  };
  const { idPedido } = useParams();


  return (
    <div>
      <div className="containerF back5">
        <div className="mainF-content">
          <h1 className="letra">Factura</h1>
          <table className="invoiceF-info">
            <tbody>
              <tr>
                <td>NIT:{idPedido}</td>
                <td>DE: EL PAN DE LA ABUELA</td>
              </tr>
              <tr>
                <td>FECHA: {new Date().toLocaleDateString()}</td>
                <td>HORA: {new Date().toLocaleTimeString()}</td>
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
              {carrito.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombreProducto}</td>
                  <td>{item.cantidad}</td>
                  <td>{formatCurrency(item.precioProducto)}</td>
                  <td>{formatCurrency(item.precioProducto * item.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totalF">
            <strong>Valor total:</strong> {formatCurrency(calcularTotal())}
          </div>
          <Link to="/metodosPago">
            <button className="btn btn-order">Metodos de pago</button>
          </Link>
        </div>
        <div className="sidebarF">
          <img
            src="../IMG/Logo.jpg"
            alt="El Pan de la Abuela"
            className="borderedF-logo"
          />
        </div>
      </div>
    </div>
  );
}
