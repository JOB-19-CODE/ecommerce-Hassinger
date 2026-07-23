import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./views/Home";
import Login from "./views/Login";
import DetalleProducto from "./views/DetalleProducto";
import { Toaster } from "react-hot-toast";

const App = () => {

  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  return (
    <div className="bg-primary min-h-screen flex flex-col">

      <Header cantidad={cantidadCarrito} />

      <div className="flex-grow"> 

        <Routes>

          <Route
            path="/"
            element={
              <Home
                cantidad={cantidadCarrito}
                setCantidad={setCantidadCarrito}
              />
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/producto/:id"
            element={<DetalleProducto />}
          />

        </Routes>

      </div>

      <Footer />
      
<Toaster
  position="bottom-right"
  reverseOrder={false}
/>
    </div>
  );
};

export default App;