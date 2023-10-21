"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
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
import { useDarkMode } from "@/app/hooks/DarkModeProvider";
import NavItem from "./NavItem";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { data: session } = useSession();

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
          <NavItem label="Inicio" icon={<AiOutlineAppstore size={30} />} />
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

            <NavItem label="Tienda" icon={<AiOutlineShopping size={30} />} />
            <NavItem
              label="Cuenta"
              icon={<AiOutlineUser size={30} />}
              link={`${session? '/dashboard' : '/login'}`}
            />
            <NavItem
              label="Contacto"
              icon={<AiOutlineCustomerService size={30} />}
            />
            <NavItem
              label="Carrito"
              icon={<AiOutlineShoppingCart size={30} />}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
