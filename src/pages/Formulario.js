/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validacionesFormulario } from "../helpers/validaciones";
import { ToastContainer, toast } from "react-toastify";

export default function Formulario() {
  const [NombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [documento, setDocumento] = useState(0);
  const [error, setError] = useState(false);
  const [messageError, setmessageError] = useState(false);

  const navigate = useNavigate();

  // State to manage form inputs
  const validaciones = () => {
    const prueba = validacionesFormulario(
      NombreCompleto,
      correo,
      telefono,
      direccion,
      usuario,
      contraseña,
      documento
    );
    if (prueba === "") {
      setError(false);
      setmessageError("");
      console.log(error, messageError, prueba);
      return true;
    }
    setError(true);
    setmessageError(prueba);
    toast.error(prueba);

    return false;
  };
  const handleRegister = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    if (validaciones()) {
      try {
        await axios.post(process.env.REACT_APP_API_USUARIO + "/register", {
          documento,
          NombreCompleto,
          correo,
          direccion,
          usuario,
          telefono,
          contraseña,
          rol: "Cliente",
        });
        toast.success("Se ha registrado correctamente");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Hubo problemas, intente más tarde");
        }
      }
    }
  };

  return (
    <div>
      <main className="mainF">
        <section className="registroF-container block  w-full justify-center">
          <div className="registroF block">
            <h2>FORMULARIO DE REGISTRO</h2>
            <form onSubmit={(e) => handleRegister(e)}>
              <label htmlFor="documento">Documento</label>
              <input
                type="number"
                id="name"
                name="nombre"
                value={documento}
                onChange={(e) => setDocumento(Number(e.target.value))}
                required
                placeholder="Documento"
              />
              <label htmlFor="name">Ingrese su nombre completo</label>
              <input
                type="text"
                id="name"
                name="nombre"
                value={NombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
                placeholder="Nombre completo..."
              />

              <label htmlFor="email">Ingrese su correo</label>
              <input
                type="email"
                id="email"
                name="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                placeholder="example@dominio.com"
              />

              <label htmlFor="address">
                Ingrese su dirección de residencia
              </label>
              <input
                type="text"
                id="address"
                name="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
                placeholder="Dirección..."
              />

              <label htmlFor="phone">Ingrese su teléfono celular</label>
              <input
                type="number"
                id="phone"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(Number(e.target.value))}
                required
                placeholder="123456789..."
              />
              <label htmlFor="user">Ingrese su usuario</label>
              <input
                type="text"
                id="user"
                name="user"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                placeholder=""
              />
              <label htmlFor="password">Ingrese su contraseña</label>
              <input
                type="password"
                id="password"
                name="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
                placeholder="********"
              />

              <button
                className="w-full bg-orange-500 p-2 rounded-lg text-white my-2 uppercase hover:opacity-80 font-bold"
                type="submit"
              >
                Registrarse
              </button>
            </form>
          </div>
          <div className="sideF-image">
            <img src="../IMG/Logo.jpg" alt="El Pan De La Abuela" />
          </div>
        </section>
      </main>
      <ToastContainer />
    </div>
  );
}
