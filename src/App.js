import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext.js";
import ScrollToTop from "./pages/ScrollToTop.js";
import Layout from "./layout/index.js";
import useAuth from "./hooks/useAuth.js";

function App() {
  const { renderVista, rol } = useAuth();

  return (
    <CarritoProvider>
      <Router>
        <Layout rol={rol}>
          <ScrollToTop />
          <Routes>{renderVista}</Routes>
        </Layout>
      </Router>
    </CarritoProvider>
  );
}

export default App;
