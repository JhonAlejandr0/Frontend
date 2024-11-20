import React from "react";

import Encabezado from "../pages/Encabezado.js";
import Pie from "../pages/Pie.js";
const Layout = ({ children, rol }) => {
  return (
    <>
      <Encabezado rol={rol} />
      <main>{children}</main>
      <Pie />
    </>
  );
};

export default Layout;
