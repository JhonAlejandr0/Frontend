import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
export default function Login({ setRol }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("usuario")) {
      navigate("/perfil");
    }
  }, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();

    // Realiza una solicitud de inicio de sesión a tu API
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_USUARIO}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo: email, password }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(data));
      //cambiar a perfil

      setRol(data.rol);
      navigate("/");
    } catch (error) {
      toast.error(
        "Error al iniciar sperfilesión. Por favor, verifica tus credenciales."
      );
    }
  };

  return (
    <div>
      <center className="Centerlogin">
        <div className="login-container">
          <h1>INGRESAR</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="forgot-password">
              <Link to="/forgetPassword">¿Has olvidado tu contraseña?</Link>
            </div>
            <button type="submit" className="login-btn">
              INICIAR SESIÓN
            </button>
          </form>
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/formulario" className="register-link">
              Regístrate
            </Link>
          </p>
        </div>
      </center>
      <ToastContainer />
    </div>
  );
}
