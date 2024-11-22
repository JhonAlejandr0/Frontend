import { Carousel } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => { 
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
      <div id="idproductos" className="product-section">
      <h2 className="product-header">PRODUCTOS</h2>
      <div className="back4">
      <div className="product-list">
          <Link to="/CataBebidas" className="product-item">
            <img src="../IMG/CocaCola1.jpeg" alt="Bebidas" className="product2-image" />
            <h3 className="product-name">Bebidas</h3>
            <p className="product-description">Para que te refresques</p>
          </Link>
          <Link to="/catalogo" className="product-item">
            <img src="../IMG/PanQueso.jpeg" alt="Panes" className="product2-image" />
            <h3 className="product-name">Panes</h3>
            <p className="product-description">Para los desayunos de todos los días</p>
          </Link>
          <Link to="/CataPostres" className="product-item">
            <img src="../IMG/PosteTiramisu1.jpeg" alt="Postres" className="product2-image" />
            <h3 className="product-name">Postres</h3>
            <p className="product-description">Para que endulces tu día</p>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;  
