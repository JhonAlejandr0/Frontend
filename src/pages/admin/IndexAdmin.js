/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function IndexAdmin() {
  const navigate = useNavigate();
  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("sesion")) || null;
    if (sesion) {
      console.log(sesion.rol);

      if (sesion.rol !== "Administrador") {
        navigate("/");
        toast.error("No tienes permisos para acceder a esta página");
      }
    }
  }, [navigate]);
  return (
    <div>
      <main className="mainIN">
        <h1>Panadería y Pastelería</h1>
        <h2>El Pan De La Abuela</h2>
        <img src="../IMG/pan.jpg" className="main-image" />
      </main>
    </div>
  );
}
