"use client";
import React, { useState, useEffect } from "react";
import {
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineCustomerService,
  AiOutlineAppstore,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import Container from "../Container";
import Link from "next/link";
import { useDarkMode } from "@/app/hooks/DarkModeProvider";
const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="py-1 gap-1 shadow ">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="group relative px-4 cursor-pointer">
              <div className="flex h-7 w-7 sm:w-10 sm:h-10 items-center justify-center rounded-full hover:text-blue-500">
                <AiOutlineAppstore size={30} />
              </div>
              <span
                className={`absolute bottom-[-2.5rem] left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 ${
                  darkMode ? "bg-black" : "bg-white"
                } px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100`}
              >
                Inicio
              </span>
            </div>
          </Link>
          <div className="flex">
            <div
              className="group relative px-4 cursor-pointer"
              onClick={toggleDarkMode}
            >
              <div className="flex h-7 w-7 sm:w-10 sm:h-10 items-center justify-center rounded-full hover:text-blue-500">
                {darkMode ? (
                  <BsSun size={30} />
                ) : (
                  <MdOutlineDarkMode size={30} />
                )}
              </div>
              <span
                className={`absolute bottom-[-2.5rem] left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 ${
                  darkMode ? "bg-black" : "bg-white"
                }`}
              >
                {darkMode ? "Claro" : "Oscuro"}
              </span>
            </div>

            <div className="group relative px-4 cursor-pointer">
              <div className="flex h-7 w-7 sm:w-10 sm:h-10 items-center justify-center rounded-full hover:text-blue-500">
                <AiOutlineShopping size={30} />
              </div>
              <span
                className={`absolute bottom-[-2.5rem] left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 ${
                  darkMode ? "bg-black" : "bg-white"
                } px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100`}
              >
                Tienda
              </span>
            </div>
            <div className="group relative px-4 cursor-pointer">
              <div className="flex h-7 w-7 sm:w-10 sm:h-10 items-center justify-center rounded-full hover:text-blue-500">
                <AiOutlineUser size={30} />
              </div>
              <span
                className={`absolute bottom-[-2.5rem] left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 ${
                  darkMode ? "bg-black" : "bg-white"
                } px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100`}
              >
                Cuenta
              </span>
            </div>
            <div className="group relative px-4 cursor-pointer">
              <div className="flex h-7 w-7 sm:w-10 sm:h-10 items-center justify-center rounded-full hover:text-blue-500">
                <AiOutlineCustomerService size={30} />
              </div>
              <span
                className={`absolute bottom-[-2.5rem] left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 ${
                  darkMode ? "bg-black" : "bg-white"
                } px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100`}
              >
                Contacto
              </span>
            </div>
            <div className="group relative px-4 cursor-pointer">
              <div className="flex h-7 w-7 sm:w-10 sm:h-10 items-center justify-center rounded-full hover:text-blue-500">
                <AiOutlineShoppingCart size={30} />
              </div>
              <span
                className={`absolute bottom-[-2.5rem] left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 ${
                  darkMode ? "bg-black" : "bg-white"
                } px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100`}
              >
                Carrito
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
