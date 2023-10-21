import Link from "next/link";

import { useDarkMode } from "@/app/hooks/DarkModeProvider";

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  link?: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, link }) => {
  const { darkMode } = useDarkMode();
  return (
    <Link href={link || '/'} className="z-50">
      <div className="group relative px-4 cursor-pointer">
        <div className="flex h-7 w-7 sm:w-10 sm:h-10 items-center justify-center rounded-full hover:text-blue-500">
          {icon}
        </div>
        <span
          className={`absolute bottom-[-2.5rem] left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 ${
            darkMode ? "bg-black" : "bg-white"
          } px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default NavItem;
