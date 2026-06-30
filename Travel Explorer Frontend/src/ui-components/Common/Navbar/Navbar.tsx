import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

import { Button } from "@/components/ui/button";
import LoginDropDown from "./Login_DropDown";
import LangDropDown from "./Lang_Dropdown";
import { useTranslation } from "react-i18next";

const navItems = [
  {
    id: 1,
    name: "explore",
    link: "/explore",
  },
  {
    id: 2,
    name: "favorites",
    link: "/favorites",
  },
  {
    id: 3,
    name: "destinations",
    link: "/globe",
  },
  
  {
    id: 4,
    name: "compare",
    link: "/compare",
  },
  {
    id: 5,
    name: "plans",
    link: "/plans",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { pathname } = useLocation();

  const [isHovered, setIsHovered] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false);

  const isGlobePage = pathname === "/globe";

  useEffect(() => {
    if (!isGlobePage) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 40) {
        setIsNearTop(true);
      } else {
        setIsNearTop(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isGlobePage]);

  const showNavbar = !isGlobePage || isHovered || isNearTop || isOpen;

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-100 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-all duration-300 transform ${
        showNavbar ? "translate-y-0" : "-translate-y-full max-md:translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex gap-10">
          <Link
            to="/"
            className="text-3xl font-bold text-[#2563EB] transition-opacity hover:opacity-80"
          >
            Voyage
          </Link>
          <ul className=" items-center gap-7 hidden md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `relative pb-1 text-sm font-medium transition-colors duration-300
                    ${
                      isActive
                        ? "text-[#2563EB]"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#2563EB]"
                    }
                    after:absolute after:left-0 after:bottom-0
                    after:h-0.5 after:bg-[#2563EB]
                    after:transition-all after:duration-300
                    ${
                      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                    }`
                  }
                >
                  {" "}
                  {t(`${item.name}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {/* <div className="flex justify-center items-center gap-1 border-gray-400/50 dark:border-slate-800 border-2 rounded-4xl pl-2 bg-blue-200/30 dark:bg-slate-900/40">
            <Search size={15} className="text-gray-400" />

            <Input
              placeholder={t("search_destinations")}
              className="w-72 rounded-full border-0 shadow-none focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none bg-transparent"
            />
          </div> */}

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors cursor-pointer hover:bg-blue-200 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <LangDropDown />

          <div>
            {user ? (
              <LoginDropDown />
            ) : (
              <Link to="/login">
                <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer text-white">
                  {t("login")}
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors cursor-pointer hover:bg-blue-200 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <LangDropDown />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 transition-colors cursor-pointer hover:bg-blue-200 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden bg-white dark:bg-slate-950 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <div className="px-6">
          {/* <Input
            placeholder="Search destinations..."
            className="mb-4 rounded-full border-gray-300 dark:border-slate-800 dark:bg-slate-900"
          /> */}

          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block font-medium transition-colors ${
                      isActive
                        ? "text-[#2563EB]"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#2563EB]"
                    }`
                  }
                >
                  {t(`${item.name}`)}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <Button className="mt-4 w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white cursor-pointer">
              Profile
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
