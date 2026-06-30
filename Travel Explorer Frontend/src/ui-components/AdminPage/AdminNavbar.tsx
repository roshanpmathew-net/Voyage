import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const nav = useNavigate();

  return (
    <div className="w-full flex p-3 px-7 justify-between">
      <div className="text-2xl font-bold text-[#2563EB] transition-opacity hover:opacity-80 ">
        Voyage Admin
      </div>
      <div>
        <div className="flex flex-row gap-6 items-center">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors cursor-pointer hover:bg-blue-200 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200"
          >
            {theme === "dark" ? <Sun size={25} /> : <Moon size={25} />}
          </button>
          <button
            type="button"
            onClick={() => nav("/")}
            className=" h-10
                px-5
                bg-[#2563EB]
                hover:bg-[#1D4ED8]
                text-white
                shadow-md
                transition-all
                duration-300
                hover:shadow-lg
                cursor-pointer
                rounded-3xl
                w-full
                sm:w-auto"
          >
            Voyage
          </button>
          <div className="flex flex-row gap-2 items-center">
            <img
              onClick={()=>nav('/profile')}
              className="h-10 w-10 rounded-full border-2 border-blue-600 cursor-pointer "
              src={user?.img_url || ""}
              alt={user?.name}
            />
            <div>
              <h1 className="text-sm">{user?.name}</h1>
              <p className="text-xs">Admin User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
