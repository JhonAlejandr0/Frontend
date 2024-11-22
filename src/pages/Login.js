import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Login({ setRol }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar visibilidad de contraseña
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("usuario")) {
      navigate("/perfil");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
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
      setRol(data.rol);
      navigate("/");
    } catch (error) {
      toast.error(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  };

  return (
    <div className="back2">
      <center className="Centerlogin">
        <div className="login-container">
          <h1 className="letra">INGRESAR</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"} // Alternar tipo de campo
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"} {/* Alternar ícono */}
              </span>
            </div>
            <div className="forgot-password">
              <Link to="/forgetPassword">¿Has olvidado tu contraseña?</Link>
            </div>
            <button type="submit" className="login-btn">
              INICIAR SESIÓN
            </button>
          </form>
          <p className="forgot-password">
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
