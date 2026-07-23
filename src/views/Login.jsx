import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [errorValidacion, setErrorValidacion] = useState("");
  const [procesando, setProcesando] = useState(false);


  const registrarUsuario = async (e) => {

    e.preventDefault();

    // VALIDACIÓN

    setErrorValidacion("");

    if (!correo.trim()) {

      setErrorValidacion(
        "El campo no puede estar vacío."
      );

      return;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correo)) {

      setErrorValidacion(
        "Por favor, ingresa un correo electrónico válido."
      );

      return;

    }


    // LOADER

    setProcesando(true);


    const urlApi =
      "https://firestore.googleapis.com/v1/projects/ecommerce-hassinger/databases/(default)/documents/usuarios";


    const payload = {

      fields: {

        correo: {
          stringValue: correo
        },

        fechaRegistro: {
          stringValue: new Date().toISOString()
        }

      }

    };


    try {

      const respuesta = await fetch(urlApi, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(payload)

      });


      if (!respuesta.ok) {

        throw new Error(
          "No se pudo registrar el usuario."
        );

      }


      toast.success(
        "¡Cuenta creada con éxito! Redireccionando al catálogo."
      );


      navigate("/");


    } catch (error) {

      toast.error(error.message);

    } finally {

      setProcesando(false);
      setCorreo("");

    }

  };


  return (

    <div className="max-w-md mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-md mt-10">

      <h2 className="text-2xl font-bold text-center text-green-700 mb-2">

        Registro de Clientes

      </h2>


      <p className="text-center text-gray-500 mb-6">

        Registra tu correo y forma parte de nuestra comunidad.

      </p>


      <form
        onSubmit={registrarUsuario}
        className="flex flex-col gap-4"
      >


        <div>

          <input

            type="text"

            placeholder="Ingresa tu correo"

            value={correo}

            onChange={(e) => {

              setCorreo(e.target.value);
              setErrorValidacion("");

            }}

            disabled={procesando}

            className={`w-full p-3 border rounded-lg outline-none transition-colors ${
              errorValidacion
                ? "border-red-500"
                : "border-gray-300 focus:border-sky-500"
            }`}

          />


          {errorValidacion && (

            <p className="text-red-500 text-sm mt-2">

              {errorValidacion}

            </p>

          )}

        </div>


        <button

          type="submit"

          disabled={procesando}

          className={`w-full text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition ${
            procesando
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600"
          }`}

        >

          {procesando ? (

            <>

              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >

                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0
                  C5.373 0 0 5.373 0 12h4z"
                />

              </svg>

              Registrando usuario...

            </>

          ) : (

            "Crear Cuenta"

          )}

        </button>

      </form>

    </div>

  );

};

export default Login;