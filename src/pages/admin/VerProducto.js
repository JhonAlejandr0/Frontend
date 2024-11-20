/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const URI = process.env.REACT_APP_API_PRODUCTO; // Ajusta esta URI según tu API

export default function VerProducto() {
  const [producto, setProducto] = useState(null);
  const { idProductos } = useParams(); // Obtener ID del producto desde la URL

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await axios.get(`${URI}/${idProductos}`);
        console.log("Product ID:", idProductos);
        console.log("API Response:", res.data);

        setProducto(res.data);
        console.log("Product:", producto);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error(error.message);
        setProducto(null);
      }
    };

    fetchProducto();
  }, [producto, idProductos]);

  if (!producto) {
    // Mostrar un mensaje de carga mientras se obtiene el producto
    return <Spinner animation="border" role="status" />;
  }

  return (
    <div>
      <main className="mainIP">
        <h1>Información Producto</h1>
        <div className="contentIP">
          <div className="formIP-section">
            <form className="formIP">
              <div className="formIP-group">
                <label htmlFor="nombre">Nombre del producto</label>
                <input
                  type="text"
                  id="nombre"
                  value={producto.nombreProducto}
                  disabled
                />
              </div>
              <div className="formIP-group">
                <label htmlFor="precio">Precio unitario</label>
                <input
                  type="text"
                  id="precio"
                  value={`${producto.precioProducto}`}
                  disabled
                />
              </div>
              <div className="formIP-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  id="stock"
                  value={producto.stockProducto}
                  disabled
                />
              </div>
              <div className="formIP-group flex flex-col my-2">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  disabled
                  value={
                    producto.descripcionProducto ||
                    "No hay descripción disponible."
                  }
                />
              </div>
              <div className="formIP-group">
                <label htmlFor="foto">Foto</label>
                <img
                  src={`../IMG/${producto.foto_URL}`}
                  className="productIP-image max-w-md"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="buttonIP-section">
          <Link to={`/actualizarProducto/${producto.idProductos}`}>
            <button className="BotonEliminar w-full my-3 font-2xl">
              ¿Actualizar?
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
