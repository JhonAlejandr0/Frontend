import { useMemo } from "react";
import { Route } from "react-router-dom";
import PrivateRoutAdmin from "../routes/private/PrivateRoutAdmin";
import PrivateRoutUser from "../routes/private/PrivateRoutUser";
import PrivateRoutDomiciliario from "../routes/private/PrivateRoutDelievery";
import { useEffect, useState } from "react";
const useAuth = () => {
  const [rol, setRol] = useState("");
  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("usuario"));

    if (!sesion) {
      setRol(null);

      return;
    }

    setRol(sesion.rol);
  }, [rol]);
  const renderVista = useMemo(() => {
    if (rol === "Administrador") {
      return (
        <>
          <Route path="/*" element={<PrivateRoutAdmin setRol={setRol} />} />
        </>
      );
    }
    if (rol === "Cliente" || rol === null) {
      return (
        <Route
          path="/*"
          element={<PrivateRoutUser setRol={setRol} rol={rol} />}
        />
      );
    }
    if (rol === "Domiciliario") {
      return (
        <Route
          path="/*"
          element={<PrivateRoutDomiciliario setRol={setRol} />}
        />
      );
    }
  }, [rol]);

  return { renderVista, rol, setRol };
};

export default useAuth;
