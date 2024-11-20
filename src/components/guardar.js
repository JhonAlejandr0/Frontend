          <div className="usuario">
            {/*Vista de productos*/}
            <Route path="/catalogo" element={<Catalogo categoria="panes" />} />
            <Route
              path="/cataPostres"
              element={<Catalogo categoria="postres" />}
            />
            <Route
              path="/cataBebidas"
              element={<Catalogo categoria="bebidas" />}
            />
            <Route path="/C_Compras" element={<CCompras />} />
            <Route path="/datosPago" element={<DatosPago />} />
            <Route path="/descripcion-p" element={<DescripcionP />} />
            <Route path="/factura" element={<Factura />} />
            <Route path="/metodosPago" element={<MetodosPago />} />
            <Route path="/C_Compras/:idProductos" element={<CCompras />} />
            <Route path="/verProducto/:idProductos" element={<VerProducto />} />
            <Route
              path="/descripcion-P/:idProductos"
              element={<DescripcionP />}
            />
          </div>

          <div className="Admin">
            <Route
              path="/actualizarProducto"
              element={<ActualizarProducto />}
            />
            <Route path="/ListaUsuarios" element={<ListaUsuarios />} />
            <Route
              path="/formularioRegistroUsuario"
              element={<FormularioRegistroU />}
            />
            <Route
              path="/actualizacionUsuarios/:docum_ento"
              element={<ActualizacionUsuarios />}
            />
            <Route
              path="/actualizarProducto/:idProductos"
              element={<ActualizarProducto />}
            />
            <Route path="/verUsuario/:docum_ento" element={<VerUsuario />} />
            <Route path="/registroProducto" element={<RegistroProducto />} />
            <Route path="/indexAdmin" element={<IndexAdmin />} />
            <Route path="/listaProducto" element={<ListaProducto />} />
          </div>
          <div className="Domiciliario">

          </div>