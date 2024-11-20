import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CarritoContext } from "../../context/CarritoContext";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

export default function Catalogo({ categoria }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { agregarProducto } = useContext(CarritoContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_PRODUCTO}/categoria/${categoria}`
        );
        setProductos(res.data);
      } catch (error) {
        toast.error("Error al obtener los productos:");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [categoria]);

  return (
    <>
      <button className="botonVolver" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left" />
      </button>

      <main className="main">
        <section>
          <h1 className="categoria-header">{categoria}</h1>

          <div className="productos-list">
            {cargando ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : productos.length > 0 ? (
              productos.map((producto) =>
                producto.stockProducto === 0 ? null : (
                  <div className="producto" key={producto.idProductos}>
                    <img
                      src={`/IMG/${producto.foto_URL}`}
                      alt={producto.nombreProducto}
                      className="producto-imagen"
                    />
                    <h3 className="producto-nombre">
                      {producto.nombreProducto}
                    </h3>
                    <p className="producto-precio">
                      {producto.precioProducto} $
                    </p>
                    <div className="botones">
                      <button
                        className="boton-agregar"
                        onClick={() => agregarProducto(producto)}
                      >
                        Agregar
                      </button>
                      <Link to={`/descripcion-P/${producto.idProductos}`}>
                        <button className="boton-ver">
                          Ver <i className="fa-solid fa-eye" />
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              )
            ) : (
              <p>No hay productos disponibles</p>
            )}
          </div>
        </section>
        <ToastContainer />
      </main>
    </>
  );
}
