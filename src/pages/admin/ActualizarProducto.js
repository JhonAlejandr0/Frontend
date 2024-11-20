/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const URI = process.env.REACT_APP_API_PRODUCTO; // Ajusta esta URI según tu API

export default function ActualizarProducto() {
  const [producto, setProducto] = useState(null);
  const { idProductos } = useParams(); // Obtener ID del producto desde la URL
  const navigate = useNavigate(); // Hook para redirigir
  const [loading, setLoading] = useState(true);
  const [urlTemporal, seturlTemporal] = useState("");
  const [foto_URL, setFoto_URL] = useState("");

  const fetchProducto = async () => {
    try {
      const res = await axios.get(`${URI}/${idProductos}`);
      setProducto(res.data);
      seturlTemporal("/IMG/" + res.data.foto_URL);
      setLoading(false);
    } catch (error) {
      console.error("No se pudo obtener el producto:", error);
    }
  };
  useEffect(() => {
    fetchProducto();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagenProducto", foto_URL);
    formData.append("nombreProducto", producto.nombreProducto);
    formData.append("precioProducto", producto.precioProducto);
    formData.append("stockProducto", producto.stockProducto);
    formData.append("descripcionProducto", producto.descripcionProducto);
    formData.append("idProducto", idProductos);

    try {
      await axios.post(URI + "/actualizar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/listaProducto"); // Redirige a la lista de productos después de la actualización
    } catch (error) {
      console.error("No se pudo actualizar el producto:", error);
    }
  };

  const handleImagenTemporal = (e) => {
    const file = e.target.files[0];
    setFoto_URL(file);
    if (file) {
      const urlTemporal = URL.createObjectURL(file);
      seturlTemporal(urlTemporal);
    }
  };
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <main className="mainIP">
        <h1>Actualizar Producto</h1>
        <div className="contentIP">
          <div className="formIP-section">
            <form className="formIP" enctype="multipart/form-data">
              <div className="formIP-group">
                <label htmlFor="nombre">Nombre del producto</label>
                <input
                  type="text"
                  id="nombre"
                  value={producto.nombreProducto}
                  onChange={(e) =>
                    setProducto({ ...producto, nombreProducto: e.target.value })
                  }
                />
              </div>
              <div className="formIP-group">
                <label htmlFor="precio">Precio unitario</label>
                <input
                  type="text"
                  id="precio"
                  value={producto.precioProducto}
                  onChange={(e) =>
                    setProducto({ ...producto, precioProducto: e.target.value })
                  }
                />
              </div>
              <div className="formIP-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  id="stock"
                  value={producto?.stockProducto}
                  onChange={(e) =>
                    setProducto({ ...producto, stockProducto: e.target.value })
                  }
                />
              </div>
              <div className="formIP-group flex flex-col mx-3">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  value={producto.descripcionProducto}
                  onChange={(e) =>
                    setProducto({
                      ...producto,
                      descripcionProducto: e.target.value,
                    })
                  }
                />
              </div>
              <div className="formIP-group">
                <label htmlFor="foto">Foto</label>
                <img src={urlTemporal} className="productIP-image max-w-md" />
                <input
                  id="imagenProducto"
                  type="file"
                  required
                  name="imagenProducto"
                  accept="image/*"
                  onChange={(e) => {
                    handleImagenTemporal(e);
                  }}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="buttonIP-section ">
          <button
            className="BotonEliminar w-full p-2 my-3 text-4xl uppercase font-black"
            onClick={(e) => handleUpdate(e)}
          >
            Actualizar
          </button>
        </div>
      </main>
    </div>
  );
}
