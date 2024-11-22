/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Dedicamos() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="back5">
      <main className="main-dedicamos">
        <section className="descripcion-container product-section">
          <h1 className="product-header">¿A qué nos dedicamos y qué buscamos?</h1>
          <h2 className="product-description">
            “El pan de abuela E.L.” es una empresa dedicada a la panadería y
            pastelería artesanal. Actualmente, la empresa busca expandir su
            alcance y mejorar sus ventas a través de este sistema informativo.
          </h2>
          <h2 className="product-description">
            Con este proyecto buscamos aumentar la efectividad y productividad
            mediante este sistema informativo. El objetivo principal es llegar a
            muchas personas y ser reconocidos.
          </h2>
        </section>
      <section id="NuestraUbicacion" className="descripcion-container product-section">
        <h2 className="product-header">Nuestra Ubicación</h2>
        <p className="product-description">Visítanos en nuestra tienda ubicada en:</p>
        <p className="product-description">
          <strong>Crr 69c #6b 37 / Kennedy, Marsella</strong>
        </p>
        <p className="product-description">Bogotá, Colombia</p>
        <p className="product-description">Estamos abiertos de lunes a domingo, de 6:00 AM a 10:00 PM.</p>
        <div className="mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.890278657091!2d-74.1291811!3d4.630761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9dd2ce29313d%3A0x81fb49ec41cc6421!2sPan%20de%20la%20abuela!5e0!3m2!1ses!2sco!4v1690988003562!5m2!1ses!2sco"
            width={800} // Ancho aumentado
            height={450} // Alto se mantiene
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      </main>
    </div>
  );
}
