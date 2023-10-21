"use client";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDarkMode } from "@/app/hooks/DarkModeProvider";

interface IMessage {
  sender: "user" | "bot";
  content: string;
}

interface IPrompt {
  prompt: string;
  palabras: string[];
  prioridad: number;
}

interface ChatBoxProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBox: React.FC<ChatBoxProps> = ({ setIsOpen }) => {
  const conversationRef = useRef<HTMLDivElement>(null);
  const [userMessage, setUserMessage] = useState<string>("");
  const [conversation, setConversation] = useState<IMessage[]>([
    {
      sender: "bot",
      content: "Hola soy tu asistente virtual, ¿Cómo puedo ayudarte?",
    },
  ]);
  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const { darkMode } = useDarkMode();
  
  useEffect(() => {
    async function fetchPrompts() {
      try {
        const response = await fetch("/api/myprompts");
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error("Error fetching the prompts:", error);
      }
    }
    fetchPrompts();
  }, []);
  
  const normalizeText = (text: string): string => {
    return text
      .normalize("NFD") // Esta línea descompone las letras con tilde en letra + tilde
      .replace(/[\u0300-\u036f]/g, "") // Esta línea elimina las tildes
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, "");
  };
  
  
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    const normalizedUserMessage = normalizeText(userMessage);

    const botResponse = getBotResponse(normalizedUserMessage);
  
    setConversation((prev) => {
      const updatedConversation = [
        ...prev,
        { sender: "user" as const, content: userMessage },
        { sender: "bot" as const, content: botResponse },
      ];
  
      // Ajusta el scrollTop de la conversación para que muestre los mensajes más recientes
      if (conversationRef.current) {
        setTimeout(() => {
          conversationRef.current!.scrollTop = conversationRef.current!.scrollHeight;
        }, 0);
      }
  
      return updatedConversation;
    });
  
    setUserMessage("");
  };
  

  const getBotResponse = (message: string): string => {
    let matchedPrompt: IPrompt | null = null;
  
    prompts.forEach((prompt) => {
      const matchedKeywords = prompt.palabras.filter((palabra) => {
        // Aquí también estamos normalizando cada palabra clave antes de compararla
        return message.includes(normalizeText(palabra));
      });
  
      if (matchedKeywords.length > 0) {
        if (!matchedPrompt || prompt.prioridad < matchedPrompt.prioridad) {
          matchedPrompt = prompt;
        }
      }
    });
  
    return matchedPrompt
      ? (matchedPrompt as IPrompt).prompt
      : "¿Puedes reformular la pregunta?";
  };
  

  return (
    <div className="w-64 h-80 bg-white border border-gray-300 p-2 rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-black">Soporte</div>
        <button
          className="rounded-full hover:bg-gray-200 p-1"
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose size={20} color="black"/>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2" ref={conversationRef}>
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`mb-2 rounded px-3 py-2 inline-block text-xs ${
              message.sender === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-black"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="border-t p-2">
        <input
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Escribe tu mensaje..."
          className="w-3/4 p-1 border rounded text-xs"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-1 rounded ml-2 text-xs"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
