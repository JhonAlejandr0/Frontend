import { Carousel } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => { 
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
      <div className="product-section">
        <h2 className="product-header">Productos</h2>
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
  );
};

export default Home;  
