/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import {  toast } from "react-toastify";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// La URI del endpoint para registrar usuarios
const URI = process.env.REACT_APP_API_USUARIO;
export default function Formulario() {
  const [NombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("Cliente");
  const [documento, setDocumento] = useState("");

  const navigate = useNavigate();

  // State to manage form inputs

  const handleRegister = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    try {
      await axios.post(`${URI}/register`, {
        documento,
        NombreCompleto,
        correo,
        direccion,
        usuario,
        telefono,
        contraseña,
        rol,
      });

      toast.success("Usuario registrado correctamente");
      setTimeout(() => {
        navigate("/ListaUsuarios");
      }, 2000); 
    } catch (error) {
      console.error("Error al crear Usuario:", error);
    }
  };

  return (
    <main className="mainF">
      <section className="registroF-container">
        <div className="registroF">
          <h2>FORMULARIO DE REGISTRO</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="document">Ingrese su número de documento</label>
            <input
              type="text"
              required
              placeholder="200202"
              value={documento}
              onChange={(e) => setDocumento(Number(e.target.value))}
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

            <label htmlFor="address">Ingrese su dirección de residencia</label>
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

            <label htmlFor="role">Rol</label>
            <select
              id="role"
              name="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="Cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
              <option value="Domiciliario">Domiciliario</option>
              <option value="Empleado">Empleado</option>
            </select>

            <button type="submit">Registrarse</button>
          </form>
        </div>
        <div className="sideF-image">
          <img src="../IMG/Logo.jpg" alt="El Pan De La Abuela" />
        </div>
      </section>
    </main>
  );
}
