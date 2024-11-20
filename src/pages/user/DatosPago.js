import React from "react";

export default function DatosPago() {
  // Define the handleClick function
  const handleClick = () => {
    alert("Compra finalizada con éxito");
    window.location.href = "/domicilio"; // Redirige a la página de domicilio
  };

  return (
    <main className="mainDP">
      <h1>Ingrese los datos abajo</h1>
      <div className="contentDP-wrapper">
        <form className="paymentDP-form">
          <div className="formDP-group">
            <label className="labelDP" htmlFor="card-number">
              Número de tarjeta
            </label>
            <input
              className="inputDP"
              type="text"
              id="card-number"
              placeholder="Número de tarjeta"
            />
            <img src="../IMG/visa.webp" alt="VISA" className="card-logoDP" />
          </div>
          <div className="formDP-group">
            <label className="labelDP" htmlFor="card-holder-name">
              Nombre completo (del titular de la tarjeta)
            </label>
            <input
              className="inputDP"
              type="text"
              id="card-holder-name"
              placeholder="Nombre completo"
            />
          </div>
          <div className="formDP-group">
            <label className="labelDP" htmlFor="expiry-date">
              Fecha de expiración
            </label>
            <input
              className="inputDP"
              type="text"
              id="expiry-date"
              placeholder="MM / AA"
            />
          </div>
          <div className="formDP-group">
            <label className="labelDP" htmlFor="cvv">
              Código de seguridad
            </label>
            <input className="inputDP" type="text" id="cvv" placeholder="CVV" />
          </div>
          <div className="formDP-group">
            <label className="labelDP" htmlFor="installments">
              Número de cuotas
            </label>
            <select id="installments">
              <option value={1}>1 × 16200.00 (sin intereses)</option>
            </select>
          </div>
          <div className="formDP-group">
            <label className="labelDP" htmlFor="phone">
              Teléfono del titular
            </label>
            <input
              className="inputDP"
              type="text"
              id="phone"
              placeholder="Teléfono del titular"
            />
          </div>
          <div className="formDP-group">
            <label className="labelDP" htmlFor="dob">
              Fecha de nacimiento
            </label>
            <input
              className="inputDP"
              type="text"
              id="dob"
              placeholder="Fecha de nacimiento"
            />
          </div>
          <div className="formDP-group">
            <label className="labelDP" htmlFor="id-document">
              Documento de identificación (CURP/RFC/IFE/DNI/CI/CC)
            </label>
            <input
              className="inputDP"
              type="text"
              id="id-document"
              placeholder="Documento de identificación"
            />
          </div>
          <button
            type="button"
            className="buttonDP-finalizar-compra"
            onClick={handleClick}
          >
            Finalizar La Compra
          </button>
        </form>
        <aside className="infoDP-box">
          <h2>¿Por qué necesitamos esta información?</h2>
          <p>
            Sirve para autentificar a los usuarios y garantizar la seguridad de
            la transacción.
          </p>
          <p>
            Uno de nuestros representantes podrá ponerse en contacto con usted
            para confirmar estos datos.
          </p>
          <p>
            Los intereses en esta compra que puedan generarse en tu extracto,
            deben ser confirmados directamente con tu banco.
          </p>
        </aside>
      </div>
    </main>
  );
}
