/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
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
      <Carousel>
        <Carousel.Item>
          <img
            src="../IMG/banner1.jpeg"
            className="carousel-image"
            alt="Promoción Torta"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="../IMG/banner2.jpeg"
            className="carousel-image"
            alt="Promoción 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="../IMG/banner3.jpeg"
            className="carousel-image"
            alt="Promoción 2"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
