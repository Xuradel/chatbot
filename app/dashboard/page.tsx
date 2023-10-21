"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Banner from "../components/Banner";
import ItemLoader from "../components/ItemLoader";
import Container from "../components/Container";
import { useRouter } from "next/navigation";

interface IPrompt {
  _id: string;
  prompt: string;
  palabras: string[];
  prioridad: number;
}

const Page = () => {
  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPrompts() {
      try {
        const response = await fetch("/api/myprompts");
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error("Error fetching the prompts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPrompts();
  }, []);

  const handleDelete = async (id: string, index: number) => {
    try {
      const response = await fetch("/api/delete-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.status === 200) {
        const updatedPrompts = [...prompts];
        updatedPrompts.splice(index, 1);
        setPrompts(updatedPrompts);
      } else {
        console.error("Failed to delete prompt");
      }
    } catch (error) {
      console.error("Error deleting the prompt:", error);
    }
  };

  const handleEdit = (prompt: IPrompt) => {
    // Navega a la página de edición con el ID del prompt como parámetro
    router.push(`/prompts/edit/${prompt._id}`);
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
              title="Aca encontraras tus respuestas creadas"
              subtitle="Para crear alguna respuesta ve a 'Prompts'"
            />

            {isLoading ? (
              <ItemLoader />
            ) : (
              <>
                {prompts.length === 0 ? (
                  <p className="text-gray-700 mt-4">
                    Aun no has creado ninguna respuesta, porfavor ve a prompts
                    para crear una.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {prompts.map((prompt, index) => (
                      <li
                        key={index}
                        className="flex flex-col justify-between items-start mb-4
                        lg:flex-row"
                      >
                        <div className="w-full lg:w-3/4 flex flex-col gap-1">
                          <h3 className="font-bold">{prompt.prompt}</h3>
                          <p className="font-bold">
                            Palabras clave:
                            <span className="font-light">
                              {prompt.palabras.join(", ")}
                            </span>
                          </p>
                          <p className="font-bold">
                            Prioridad:
                            <span className="font-light">
                              {prompt.prioridad}
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(prompt)}
                            className="border border-zinc-500 hover:bg-zinc-300 text-zinc-500 px-3 py-1 rounded mr-2"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => handleDelete(prompt._id, index)}
                            className="bg-stone-500 hover:bg-stone-600 text-white px-3 py-1 rounded"
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Page;
