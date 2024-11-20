/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { formatCurrency } from "../../helpers/format";
import { Spinner } from "react-bootstrap";
import customStyles from "../../styles/style";
const URI = process.env.REACT_APP_API_PRODUCTO;

export default function ListaProducto() {
  const [productos, setProducto] = useState([]);
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [loading, setLoading] = useState(true);

  const columns = [
    { name: "ID", selector: (row) => row.idProductos },
    { name: "Nombre", selector: (row) => row.nombreProducto, sortable: true },
    { name: "Precio", selector: (row) => row.precioProducto },
    { name: "Stock", selector: (row) => row.stockProducto },
    { name: "Acciones", selector: (row) => row.acciones },
  ];
  useEffect(() => {
    getProductos();
    setLoading(false);
  }, []);

  // Mostrar todos los productos
  const getProductos = async () => {
    const res = await axios.get(URI + "/");
    const agregandoAcciones = res.data.map((producto) => ({
      ...producto,
      acciones: (
        <>
          <button
            onClick={() => deleteProducto(producto.idProductos)}
            className="btn-small eliminar"
          >
            X
          </button>

          <button className="btn-small ver">
            <Link to={`/verProducto/${producto.idProductos}`}>Ver</Link>
          </button>
        </>
      ),
      precioProducto: formatCurrency(producto.precioProducto),
    }));
    setProducto(agregandoAcciones);
  };

  // Eliminar producto
  const deleteProducto = async (idProductos) => {
    await axios.delete(`${URI}/${idProductos}`);
    getProductos();
  };

  // Buscar un producto por ID o nombre
  useEffect(() => {
    if (!busquedaProducto) {
      getProductos();
      return;
    }
    const regex = new RegExp(busquedaProducto, "i");
    const productosConFiltro = productos.filter(
      (producto) =>
        regex.test(producto.idProductos.toString()) ||
        regex.test(producto.nombreProducto) ||
        regex.test(producto.precioProducto.toString()) ||
        regex.test(producto.stockProducto.toString())
    );
    setProducto(productosConFiltro);
  }, [busquedaProducto]);

  return (
    <div>
      <main className="mainAU">
        <h1>Búsqueda de producto </h1>
        <div className="contentP">
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Ingrese ID o nombre del producto"
                value={busquedaProducto}
                onChange={(e) => setBusquedaProducto(e.target.value)}
              />
            </div>
            <DataTable
              columns={columns}
              data={productos}
              progressPending={loading}
              pagination
              highlightOnHover
              progressComponent={<Spinner animation="border" />}
              customStyles={customStyles}
            />
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
