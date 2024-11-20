import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Recuperar = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(token);
      const response = await fetch(
        process.env.REACT_APP_API_USUARIO + "/token/" + token,
        {
          method: "PUT",
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
      toast.success(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error al recuperar contraseña");
    }
  };
  return (
    <div className="my-20">
      <center className="Centerlogin">
        <div className="login-container">
          <h1>Recuperar contraseña</h1>
          <form>
            <input
              className=""
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">
              Contraseña Nueva
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="login-btn"
              onClick={(e) => handleLogin(e)}
            >
              Cambiar Contraseña
            </button>
          </form>
        </div>
      </center>
      <ToastContainer />
    </div>
  );
};

export default Recuperar;
