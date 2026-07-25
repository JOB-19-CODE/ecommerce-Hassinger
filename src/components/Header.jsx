import React from "react";
import { Link } from "react-router-dom";

import searchIcon from "../assets/buscar.svg";
import cartIcon from "../assets/carrito.svg";
import heartIcon from "../assets/corazon.svg";

const Header = ({ cantidad }) => {
  return (
    <header className="bg-white border-b border-border-default p-4 flex justify-between items-center sticky top-0 z-50 font-sans">

      {/* LOGO */}
      <div className="header-logo">
        <Link
          to="/"
          className="text-xl font-lora font-bold text-brand-primary hover:text-green-700 transition-colors"
        >
          RAIZ CHONTABAMBINO
        </Link>
      </div>

      {/* NAVEGACIÓN */}
      <nav className="flex items-center gap-4">

        <button className="p-2 hover:bg-secondary rounded-full transition-colors">
          <img
            src={searchIcon}
            alt="Buscar"
            className="w-6 h-6"
          />
        </button>

        <Link
          to="/login"
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <img
            src={heartIcon}
            alt="Mi Cuenta"
            className="w-6 h-6"
          />
        </Link>

        <div className="relative">

          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <img
              src={cartIcon}
              alt="Carrito"
              className="w-8 h-8"
            />
          </button>

          <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
            {cantidad}
          </span>

        </div>

      </nav>

    </header>
  );
};

export default Header;