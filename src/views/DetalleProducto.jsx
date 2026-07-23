import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DetalleProducto = () => {

  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    const obtenerProducto = async () => {

      try {

        const url =
          "https://firestore.googleapis.com/v1/projects/ecommerce-hassinger/databases/(default)/documents/productos";

        const respuesta = await fetch(url);

        const datos = await respuesta.json();

        const productos = datos.documents.map((doc) => ({

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

        }));

        const encontrado = productos.find(
          (p) => p.id === Number(id)
        );

        setProducto(encontrado);

      } catch (error) {

        console.log(error);

      } finally {

        setCargando(false);

      }

    };

    obtenerProducto();

  }, [id]);

  if (cargando) {
    return (
      <div className="text-center mt-20 text-xl">
        Cargando producto...
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="text-center mt-20">
        Producto no encontrado.
      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto py-10 px-6">

      <Link
        to="/"
        className="text-sky-600 hover:text-sky-700 font-semibold"
      >
        ← Volver al catálogo
      </Link>

      <div className="bg-white rounded-xl shadow-lg mt-6 p-8">

        <div className="grid md:grid-cols-2 gap-10">

          <div>

            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full rounded-xl"
            />

          </div>

          <div>

            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
              {producto.descuento}
            </span>

            <h1 className="text-3xl font-bold mt-4">
              {producto.nombre}
            </h1>

            <div className="mt-6">

              <span className="text-4xl font-bold text-green-700">
                S/. {producto.precio.toFixed(2)}
              </span>

              <span className="ml-3 text-gray-400 line-through">
                S/. {producto.precioAntiguo.toFixed(2)}
              </span>

            </div>

            <p className="mt-6 text-gray-600">
              Producto artesanal elaborado por productores de la
              Selva Central. Calidad garantizada y envío seguro.
            </p>

            <button
              className="mt-8 w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold"
            >
              Añadir al carrito
            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default DetalleProducto;