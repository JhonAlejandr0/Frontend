import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import { toast, ToastContainer } from "react-toastify";
import { formatCurrency } from "../../helpers/format";

export default function CCompras({ rol }) {
  const navigation = useNavigate();
  const { carrito, setCarrito, agregarProducto, valorTotal } =
    useContext(CarritoContext);
  // Función para aumentar la cantidad de un producto

  // Función para eliminar un producto
  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((item) => item.idProductos !== index);

    setCarrito(nuevoCarrito);
  };

  const manejoUrl = () => {
    console.log(rol);
    if (carrito.length === 0) {
      toast.error("No hay productos en el carrito");
      setTimeout(() => {
        navigation("/");
      }, 2500);
      return;
    }
    if (rol === "Cliente") {
      navigation("/factura");
      return;
    } else {
      toast.error("Inicia sesion primero para poder realizar un pedido");
      setTimeout(() => {
        navigation("/login");
      }, 2500);
    }
  };

  return (
    <>
      <button className="botonVolver" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left" />
      </button>

      <div className="cart-containerr back5">
        <h2 className="cart-title">Carrito de Compras</h2>

        {carrito.map((item, index) => (
          <div className="product-row" key={index}>
            <div className="product-details">
              <img
                src={`../IMG/${item.foto_URL}`}
                alt={item.nombreProducto}
                className="product-image"
              />
              <div>
                <h5 className="product-name letra">{item.nombreProducto}</h5>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio: {formatCurrency(item.precioProducto)}</p>
                <p>
                  Valor Total:{" "}
                  {formatCurrency(item.precioProducto * item.cantidad)}
                </p>
              </div>
            </div>

            <div className="product-actions">
              <button
                className="btn btn-add"
                onClick={() => agregarProducto(item, +1, "compra")}
              >
                <i className="fas fa-plus"></i>
              </button>
              <button
                className="btn btn-remove"
                onClick={() =>
                  item.cantidad > 1
                    ? agregarProducto(item, -1, "compra")
                    : item.cantidad
                }
              >
                <i className="fas fa-minus"></i>
              </button>
              <button
                className="btn btn-delete"
                onClick={() => eliminarProducto(item.idProductos)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}

        <div className="cart-summary">
          <h2 className="letra">
            Valor Total de todos los productos: {formatCurrency(valorTotal)}
          </h2>
          <button onClick={() => manejoUrl()} className="btn btn-order">
            Realizar pedido
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
