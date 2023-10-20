"use client";
import { useDarkMode } from "../hooks/DarkModeProvider";

const Page = () => {
  const { darkMode } = useDarkMode();

  return (
    <section className={`${darkMode ? "bg-custom-gray" : "bg-custom-white"}`}>
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-black tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Tecnologia al alcance de tu mano
          </h1>
          <p
            className={`max-w-2xl mb-6 font-light ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }  lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400`}
          >
            Descubre la nueva era de smartphones y encuentra el dispositivo
            perfecto para ti.
          </p>
          <a
            href="#"
            className={`inline-flex border items-center justify-center px-5 py-3 text-base font-medium text-center ${darkMode ? 'text-white border-custom-white hover:bg-custom-gray focus:ring-custom-gray' : 'text-gray-900 border-gray-300 hover:bg-gray-100 focus:ring-gray-100'} rounded-lg mr-4`}
          >
            <span className="hidden sm:flex">Explora la&nbsp;Colecci&oacute;n</span>

            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className={`inline-flex border items-center justify-center px-5 py-3 text-base font-medium text-center ${darkMode ? 'text-white border-custom-white hover:bg-custom-gray focus:ring-custom-gray' : 'text-gray-900 border-gray-300 hover:bg-gray-100 focus:ring-gray-100'} rounded-lg mr-4`}
          >
            Contáctanos
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
