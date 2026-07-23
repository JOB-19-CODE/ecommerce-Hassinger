import React from "react";
import { Link } from "react-router-dom";

const Card = ({ producto, alAgregar }) => {
  const { id, nombre, precio, precioAntiguo, descuento, imagen } = producto;

  return (
    <div
      className="bg-white border border-border-default rounded-lg shadow-sm overflow-hidden flex flex-col
      hover:shadow-md hover:scale-[1.02] transition-all duration-300 font-inter p-3 max-w-[163px] md:max-w-xs"
    >

      {/* Imagen */}
      <Link to={`/producto/${id}`}>
        <div className="w-full bg-bg-secondary rounded-radius-md overflow-hidden aspect-square flex items-center justify-center relative">

          <img
            src={imagen}
            alt={nombre}
            className="w-full h-full object-cover"
          />

          {descuento && (
            <span className="absolute top-2 left-2 bg-brand-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
              {descuento}
            </span>
          )}

        </div>
      </Link>

      <div className="mt-3 flex flex-col flex-grow text-left">

        {/* Nombre */}
        <Link
         to={`/producto/${producto.id}`}
         className="text-sm font-lora font-medium text-text-primary line-clamp-2 min-h-[40px] hover:text-sky-600">
          {nombre}
        </Link>

        {/* Precio */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 mt-2">
          <span className="text-base font-bold text-amber-500">
            S/ {precio.toFixed(2)}  
          </span>

          <span className="text-xs text-gray-400 line-through">
            S/ {precioAntiguo.toFixed(2)}
          </span>
        </div>

        {/* Botón */}
        <button
          onClick={alAgregar}
          className="w-full mt-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-4 rounded-md transition-colors shadow-sm"
        >
          Añadir al Carrito
        </button>

      </div>
    </div>
  );
};

export default Card;