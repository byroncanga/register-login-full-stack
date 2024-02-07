import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/input.css";

const login = () => {
  const { store, actions } = useContext(Context);
  const [inputData, setInputData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validamos que el email y la contraseña no están vacíos
    if (inputData.email == "" || inputData.password === "") {
      toast.error("Por favor, introduce un email y contraseña.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    // Llamamos a la acción de loginUser con el email y contraseña
    const data = await actions.loginUser(inputData);

    // Verificamos si se recibió un token de autenticación
    if (data && data.auth_token) {
      navigate("/panel");
    } else {
      toast.error(
        "Inicio de sesión fallido. Por favor, verifica tus credenciales.",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
    // Limpia los campos de entrada después de intentar iniciar sesión
    setInputData({ email: "", password: "" });
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <div>
        <div className="h-screen md:flex">
          <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
            <div>
              <h1 className="text-white font-bold text-4xl font-sans">
                Canbra Dev
              </h1>
              <p className="text-white mt-4 w-80">
                Bienvenido a Canbra, donde cada línea de código abre un mundo de
                posibilidades. ¡Inicia sesión y comencemos a dar forma al futuro
                juntos!
              </p>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          </div>
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form onSubmit={handleSubmit} className="bg-white">
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Bienvenido nuevamente
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-7">
                Ingresa al sistema con tu usuario y contraseña
              </p>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name="email"
                  value={inputData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="password"
                  name="password"
                  value={inputData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Login
              </button>
              <div className="flex gap-1 justify-center mt-3">
                <p> Si no eres usuario</p>

                <button
                  className=" text-blue-600 font-bold"
                  onClick={() => navigate("/")}
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
