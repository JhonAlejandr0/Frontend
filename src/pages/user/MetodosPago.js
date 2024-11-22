/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { toast, ToastContainer } from "react-toastify";
export default function MetodosPago() {
  const { carrito, setCarrito, valorTotal } = useContext(CarritoContext);
  console.log(valorTotal);

  console.log(process.env.REACT_APP_API_CLIENTE);

  const navigate = useNavigate();

  const enviarCompra = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_API_CLIENTE + "/compra", {
        metodosPago: "Efectivo",
        carrito,
        valorTotal,
        ...JSON.parse(localStorage.getItem("usuario")),
        fechaVenta: new Date().toLocaleString("es-CO", {
          timeZone: "America/Bogota",
        }),
      });
      toast.success("Compra realizada exitosamente");
      setCarrito([]);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error al enviar la compra:", error);
    }
  };
  return (
    <div className="back5">
      <main className="mainMP">
        <h1 className="letraa">Métodos de Pago</h1>
        <div className="metodosP">
          <div className="metodoP">
            <img src="../IMG/efectivo.jpg" alt="Efectivo" />
            <p className="letra">Efectivo</p>
            <button onClick={(e) => enviarCompra(e)}>Pagar</button>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
