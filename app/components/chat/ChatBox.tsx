"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

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
  const [userMessage, setUserMessage] = useState<string>("");
  const [conversation, setConversation] = useState<IMessage[]>([
    {
      sender: "bot",
      content: "Hola soy tu asistente virtual, ¿Cómo puedo ayudarte?",
    },
  ]);
  const [prompts, setPrompts] = useState<IPrompt[]>([]);

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
  

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const botResponse = getBotResponse(userMessage);

    setConversation([
      ...conversation,
      { sender: "user", content: userMessage },
      { sender: "bot", content: botResponse },
    ]);

    setUserMessage("");
  };

  const getBotResponse = (message: string): string => {
    let matchedPrompt: IPrompt | null = null;

    prompts.forEach((prompt) => {
      const matchedKeywords = prompt.palabras.filter((palabra) =>
        message.includes(palabra)
      );

      if (matchedKeywords.length > 0) {
        if (!matchedPrompt || prompt.prioridad < matchedPrompt.prioridad) {
          matchedPrompt = prompt;
        }
      }
    });

    return matchedPrompt
      ? matchedPrompt.prompt
      : "¿Puedes reformular la pregunta?";
  };

  return (
    <div className="w-64 h-80 bg-white border border-gray-300 p-2 rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Soporte</div>
        <button
          className="rounded-full hover:bg-gray-200 p-1"
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
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
          onKeyPress={(e) => {
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
