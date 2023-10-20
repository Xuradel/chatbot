'use client'
import React, { ReactNode } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { useDarkMode } from "../hooks/DarkModeProvider";
interface BannerProps {
  title: string;
  subtitle?: ReactNode;  // Updated this line
}

const Banner: React.FC<BannerProps> = ({ title, subtitle }) => {
    const { darkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col gap-2  
    rounded-lg py-4
    ${darkMode? 'bg-zinc-800' : 'border bg-gray-100 border-gray-300 '}
    px-4
    sm:px-6
    md:px-8
    lg:px-10
    `}
    >
      <div className="flex gap-2 ">
        <div className="pt-0.5 sm:pt-1 md:pt-1.5">
          <IoMdInformationCircle color={`${darkMode ? 'white' : 'blue'}`}/>
        </div>
        <div>
          <div
            className={`
        font-bold
        text-base
        sm:text-lg
        md:text-xl
        lg:text-2xl
        xl:text-3xl
        `}
          >
            {title}
          </div>
          <div
            className={`
        text-xs
        sm:text-sm
        md:text-base
        lg:text-lg
        xl:text-xl
      `}
          >
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
