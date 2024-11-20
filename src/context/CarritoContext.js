import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const valorInicial = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      return JSON.parse(carritoGuardado);
    } else {
      return [];
    }
  };
  const [carrito, setCarrito] = useState(valorInicial);
  const [valorTotal, setValorTotal] = useState(0);
  // Calcular el valor total de todos los productos
  useEffect(() => {
    setValorTotal(
      carrito.reduce(
        (total, item) => total + item.precioProducto * item.cantidad,
        0
      )
    );
  }, [carrito]);

  // Función para agregar un producto al carrito
  const agregarProducto = async (producto, cantidad = 1, compra) => {
    const { stockProducto, descripcionProducto, ...resto } = producto;

    try {
      const res = await axios.get(
        process.env.REACT_APP_API_PRODUCTO + `/${resto.idProductos}`
      );

      const productoExistente = carrito.find(
        (item) => item.idProductos === resto.idProductos
      );
      const productoCantidad = carrito.filter(
        (item) => item.idProductos === resto.idProductos
      );

      if (res.data.stockProducto < cantidad || res.data.stockProducto === 0) {
        return toast.error("No hay suficiente stock");
      }
      if (productoExistente) {
        if (res.data.stockProducto < cantidad + productoCantidad[0].cantidad) {
          return toast.error("No hay suficiente stock");
        }
        const nuevoCarrito = carrito.map((item) =>
          item.idProductos === resto.idProductos
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
        setCarrito(nuevoCarrito);
      } else {
        setCarrito([...carrito, { ...resto, cantidad }]);
      }

      if (compra !== "compra") {
        toast.success("Producto agregado al carrito");
      }
    } catch (error) {
      toast.error("Error al agregar el producto al carrito");
      console.log(error);
    }
  };
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarProducto,
        valorTotal,
        setValorTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
