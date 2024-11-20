/* eslint-disable jsx-a11y/alt-text */
import React from "react";

export default function InformacionPersonalConsultar() {
  return (
    <div>
      <main>
        <h1 className="main-h1">Información Personal</h1>
        <div className="content-ELUSU">
          <div className="form-sectionELUSU">
            <form className="formELUSU">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                defaultValue="Jhon Alejandro Cufiño Leon"
              />
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                id="correo"
                defaultValue="jhon15cufi@gmail.com"
                disabled
              />
              <label htmlFor="direccion">Dirección de residencia</label>
              <input
                type="text"
                id="direccion"
                defaultValue="TV 91 #76-23 CR7"
              />
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" id="telefono" defaultValue="3182309557" />
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                defaultValue="**********"
                disabled
              />
              <label htmlFor="fecha">Fecha de contratación</label>
              <input type="text" id="fecha" defaultValue="25/01/24" />
              <label htmlFor="puesto">Puesto</label>
              <input
                type="text"
                id="puesto"
                defaultValue="Encargado de la toma de domicilios."
              />
              <label htmlFor="rol">Rol</label>
              <input type="text" id="rol" defaultValue="Empleado" />
            </form>
          </div>
          <div className="image-sectionELUSU">
            <img src="../IMG/Logo.jfif" />
          </div>
        </div>
      </main>
    </div>
  );
}
