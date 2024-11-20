import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const OlvidarPassword = ({ setEmail, email, setToken, token }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setToken(Math.random().toString(36).substring(2));
    setEmail("");
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_API_USUARIO + "/token/" + token,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo: email }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
    } catch (error) {
      console.error("Error al recuperar contraseña");
    }
  };
  return (
    <div className="my-20">
      <center className="Centerlogin">
        <div className="login-container">
          <h1>Recuperar contraseña</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              RECUPERAR
            </button>
          </form>
        </div>
      </center>
      <ToastContainer />
    </div>
  );
};

export default OlvidarPassword;
