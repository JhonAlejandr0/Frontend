/* eslint-disable no-cond-assign */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = process.env.REACT_APP_API_PRODUCTO;

export default function RegistroProducto() {
  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcionProducto, setDescripcionProducto] = useState("");
  const [stockProducto, setStockProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [foto_URL, setFoto_URL] = useState("");
  const [idEmpleadoFK, setIdEmpleadoFK] = useState(1);
  const [categoria, setCategoria] = useState("");
  const [urlTemporal, seturlTemporal] = useState(null);

  const navigate = useNavigate();

  // Procedimiento para guardar
  const Agregar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagenProducto", foto_URL);
    console.log(formData);
    try {
      await axios.post(URI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          nombreProducto,
          descripcionProducto,
          stockProducto,
          precioProducto,
          categoria,
          idEmpleadoFK,
        },
      });
      alert("Producto registrado exitosamente");
      navigate("/listaProducto"); // Redirige a la lista de productos
    } catch (error) {
      console.error("Error al crear producto:", error);
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

  return (
    <div>
      <main className="mainF">
        <section className="registroF-container block  w-full justify-center">
          <div className="registroF block">
            <h1 className="letraa" style={{ marginBottom: "20px" }}>REGISTRO PRODUCTOS</h1>
            <form
              className="formR"
              onSubmit={Agregar}
              enctype="multipart/form-data"
            >
              <label htmlFor="nombre">Ingrese el nombre del producto</label>
              <input
                value={nombreProducto}
                onChange={(e) => setNombreProducto(e.target.value)}
                type="text"
                required
              />

              <label htmlFor="descripcion">
                Ingrese la descripción del producto
              </label>
              <input
                value={descripcionProducto}
                onChange={(e) => setDescripcionProducto(e.target.value)}
                type="text"
                placeholder="Descripción..."
                required
              />

              <label htmlFor="precio">Ingrese el precio del producto</label>
              <input
                value={precioProducto}
                onChange={(e) => setPrecioProducto(e.target.value)}
                type="number"
                placeholder="400..."
                required
              />

              <label htmlFor="stock">Ingrese el stock del producto</label>
              <input
                value={stockProducto}
                onChange={(e) => setStockProducto(e.target.value)}
                type="number"
                placeholder="200..."
                required
              />
              <img src={urlTemporal} className="w-1/2" />
              <label htmlFor="foto">Foto</label>
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

              <label htmlFor="categoria">Categoría</label>
              <select
                className="back"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="panes">Panes</option>
                <option value="postres">Postres</option>
                <option value="bebidas">Bebidas</option>
              </select>

              <div className="alinear">
                <button type="submit">Agregar</button>
              </div>
            </form>
          </div>
          <div className="sideF-image">
            <img src="../IMG/Logo.jfif" alt="Logo El Pan De La Abuela" />
          </div>
        </section>
      </main>
    </div>
  );
}
