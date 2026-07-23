import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
const Home = ({ cantidad, setCantidad }) => {

  // ESTADOS
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [correoBoletin, setCorreoBoletin] = useState("");
  

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorNet, setErrorNet] = useState(null);
  // OBTENER PRODUCTOS DESDE FIREBASE
useEffect(() => {

  const obtenerProductosServidor = async () => {

    try {

      setCargando(true);

      const urlFirebase =
        "https://firestore.googleapis.com/v1/projects/ecommerce-hassinger/databases/(default)/documents/productos";

      const respuesta = await fetch(urlFirebase);

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener la información del servidor");
      }

      const datosRaw = await respuesta.json();

      const productosLimpios = datosRaw.documents.map((doc) => {
        return {
          id: Number(
            doc.fields.id.integerValue ||
            doc.fields.id.doubleValue
          ),

          nombre: doc.fields.nombre.stringValue,

          precio: Number(
            doc.fields.precio.doubleValue ||
            doc.fields.precio.integerValue
          ),

          precioAntiguo: Number(
            doc.fields.precioAntiguo.doubleValue ||
            doc.fields.precioAntiguo.integerValue
          ),

          descuento: doc.fields.descuento
            ? doc.fields.descuento.stringValue
            : "",

          imagen: doc.fields.imagen.stringValue
        };
      });

      setProductos(productosLimpios);

    } catch (err) {

      console.error(err);

      setErrorNet(err.message);

    } finally {

      setCargando(false);

    }

  };

  obtenerProductosServidor();

}, []);
// FUNCIONES

const incrementarCarrito = () => {
  setCantidad((prev) => prev + 1);
};

const manejarBoletin = (e) => {
  e.preventDefault();
  alert(`¡Suscripción exitosa! Enviaremos ofertas a: ${correoBoletin}`);
  setCorreoBoletin("");
};


const productosFiltrados = productos.filter((producto) =>
  producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
);

if (errorNet) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h2 className="text-red-600 text-xl font-bold">
        Error: {errorNet}
      </h2>
    </div>
  );
}
return (
  <>
    <main className="max-w-7xl mx-auto px-6 py-6">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-slate-900 text-white rounded-xl p-6 shadow-md mb-8 text-left">
        <h2 className="text-2xl font-bold mb-2">
          Los Sabores Auténticos de la Selva Central
        </h2>

        <p className="text-sm mb-4">
          Directo del productor artesanal a tu mesa de manera sostenible.
        </p>

        <button href="#catalogo"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2 px-5 rounded-lg transition">
          Explorar Colección
        </button>
      </section>

      {/* BÚSQUEDA */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos (ej: miel, café, queso...)"
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          disabled={cargando}
          className="w-full md:w-1/2 p-3 border rounded-lg text-sm outline-none focus:border-green-600 shadow-sm"
        />
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mb-12">

        {/* CATÁLOGO */}
        <section id="catalogo" 
        className="lg:col-span-3">

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              Catálogo de Productos
            </h3>

            <span className="text-sm text-gray-500">
              {productosFiltrados.length} resultado(s)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {cargando ? (

              <div className="col-span-full bg-white p-8 rounded-lg border text-center">
                <p className="text-lg font-semibold text-gray-500">
                  Cargando productos...
                </p>
              </div>

            ) : productosFiltrados.length > 0 ? (

              productosFiltrados.map((producto) => (
                <Card
                  key={producto.id}
                  producto={producto}
                  alAgregar={incrementarCarrito}
                />
              ))

            ) : (

              <div className="col-span-full bg-white p-6 rounded-lg border text-center">
                <p className="text-gray-500">
                  No se encontraron productos.
                </p>
              </div>

            )}

          </div>

        </section>
                {/* COLUMNA LATERAL */}
        <div className="flex flex-col gap-6">

          {/* RESUMEN DE COMPRAS */}
          <section className="bg-white p-5 rounded-xl border border-gray-200 shadow-md text-left ">
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              Resumen de Compras
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Revisa los productos agregados a tu carrito.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">
                  Productos agregados:
                </span>

                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                {cantidad}
                  </span>
              </div>
            </div>

            <div className="space-y-2 text-sm border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">S/. --</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-semibold text-green-600">
                  Gratis
                </span>
              </div>

              <div className="flex justify-between border-t pt-3 mt-3">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-green-600 text-lg">
                  S/. --
                </span>
              </div>
            </div>

            <button className="w-full mt-5 bg-slate-900  hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition shadow-md">
              Finalizar Compra
            </button>

            <button className="w-full mt-2 border border-slate-900 text-slate-800 hover:bg-green-50 font-semibold py-3 rounded-lg transition">
              Ver Carrito
            </button>
          </section>

          {/* CREAR CUENTA */}
<section className="bg-white p-5 rounded-xl border border-gray-200 shadow-md">
  <h3 className="font-bold text-base mb-1">
    Crear Cuenta
  </h3>

  <p className="text-sm text-gray-500 mb-4">
    Únete a nuestra comunidad y disfruta de una experiencia de compra más rápida y segura.
  </p>

  <Link
    to="/login"
    className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition"
  >
    Ir al Registro
  </Link>
</section>

          {/* BOLETÍN */}
          <section className="bg-white p-5 rounded-xl border border-gray-200 shadow-md">
            <h3 className="font-bold text-base mb-1">
              Boletín de la Selva
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Suscríbete para recibir promociones, nuevos productos y ofertas exclusivas.
            </p>

            <form
              onSubmit={manejarBoletin}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correoBoletin}
                onChange={(e) => setCorreoBoletin(e.target.value)}
                className="w-full p-3 border rounded-lg text-sm"
                required
              />

              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold"
              >
                Suscribirme
              </button>
            </form>
          </section>

        </div>

      </div>

    </main>

  </>
);

};

export default Home;