import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../../helpers/format";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { CarritoContext } from "../../context/CarritoContext";
const URI = process.env.REACT_APP_API_PRODUCTO; // Cambia esto por la URL real de tu API

export default function DescripcionP() {
  const { idProductos } = useParams(); // Obtén el ID del producto de la URL
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true); // Agrega estado para la carga
  const [cantidad, setCantidad] = useState(1);
  const { agregarProducto } = useContext(CarritoContext);
  useEffect(() => {
    // Obtener un producto por ID
    const getProducto = async () => {
      try {
        const res = await axios.get(`${URI}/${idProductos}`);
        setProducto(res.data);
      } catch (error) {
        toast.error("Error al obtener el producto:" + error);
      } finally {
        setLoading(false); // Cambia el estado de carga después de la solicitud
      }
    };

    getProducto();
  }, [idProductos]);

  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  if (!producto) {
    return <p>Producto no encontrado.</p>; // Mensaje si no se encuentra el producto
  }

  return (
    <>
      <button className="botonVolver" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left" />
      </button>

      <main className="container mt-5">
        <div className="row back3">
          <div className="col-md-6">
            {producto.foto_URL ? (
              <img
                src={`../IMG/${producto.foto_URL}`}
                alt={producto.nombreProducto}
                className="img-fluid product2-image rounded-md"
              />
            ) : (
              <p>Imagen no disponible</p>
            )}
          </div>
          <div className="col-md-6">
            <h2 className="product-title text-4xl font-black">
              {producto.nombreProducto}
            </h2>
            <p className="product-description">
              {producto.descripcionProducto}
            </p>
            <p className="price font-black product-description">
              Precio: {formatCurrency(producto.precioProducto)}
            </p>
            <div className="mt-3 flex text-white gap-1">
              <button
                className=" bg-orange-500 w-10 p-2"
                onClick={(e) => (cantidad > 1 ? setCantidad(cantidad - 1) : 1)}
              >
                -
              </button>
              <input
                className="w-20 p-2 mx-2 bg-gray-400 h-full text-center rounded-sm"
                type="text"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
              <button
                className=" bg-orange-500 w-10 p-2"
                onClick={(e) =>
                  cantidad < producto.stockProducto
                    ? setCantidad(cantidad + 1)
                    : producto.stockProducto
                }
              >
                +
              </button>
              <button
                className="btn-d"
                onClick={() => {
                  agregarProducto(producto, cantidad);
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
