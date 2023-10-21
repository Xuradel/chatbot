"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Heading from "../components/Heading";
import Banner from "../components/Banner";
import { useDarkMode } from "../hooks/DarkModeProvider";
import Container from "../components/Container";

const Page = () => {
  const [respuesta, setRespuesta] = useState("");
  const [palabrasClave, setPalabrasClave] = useState("");
  const [prioridad, setPrioridad] = useState("1");
  const [successMessage, setSuccessMessage] = useState(false);

  const { darkMode } = useDarkMode();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const palabrasArray = palabrasClave.split(",").map((word) => word.trim());

    const dataToSend = {
      prompt: respuesta,
      palabras: palabrasArray,
      prioridad: parseInt(prioridad),
    };

    try {
      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.status === 201) {
        setRespuesta("");
        setPalabrasClave("");
        setPrioridad("1");
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      } else {
        const data = await response.json();
        alert(data.message || "Ocurrió un error al crear el prompt.");
      }
    } catch (error) {
      alert("Ocurrió un error al enviar los datos.");
    }
  };

  return (
    <div className="flex">
      <div className="w-1/12 sm:w-1/4 md:w-1/5 xl:w-1/12">
        <Sidebar />
      </div>

      <div className="w-11/12 sm:w-3/4 md:w-4/5 xl:w-11/12 h-full mr-8 mt-8 z-40">
        <Container>
          <div className="flex flex-col gap-4">
            <Banner
              title="Crea respuestas en base a palabras"
              subtitle="Relaciona palabras clave con tu pregunta"
            />
            <div className="font-black text-2xl">Ejemplo:</div>
            <Heading
              title={'"Nuestros metodos de pago son..."'}
              subtitle="tags: Pagos, metodos, como pagar"
            />
            <p>
              Si el usuario escribe {'"Metodos de pago"'} se recibira la
              respuesta proporcionada sera {'"Nuestros metodos de pago son..."'}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Respuesta:
                </label>
                <input
                  type="text"
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Palabras clave (separadas por coma):
                </label>
                <input
                  type="text"
                  value={palabrasClave}
                  onChange={(e) => setPalabrasClave(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Prioridad:
                </label>
                <select
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Crear Prompt
              </button>
              {successMessage && (
                <span className="text-green-600 ml-4">
                  Prompt creado con exito.
                </span>
              )}
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Page;
