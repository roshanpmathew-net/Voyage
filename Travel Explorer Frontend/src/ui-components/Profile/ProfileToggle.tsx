import React from "react";

const ProfileToggle = () => {
  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />

        <div
          className="
          relative flex items-center shadow-md outline-none duration-300 ring-0
          w-12 h-6 rounded-full 
          
          bg-black peer-checked:bg-blue-600 
          
          dark:bg-slate-700 dark:peer-checked:bg-blue-500
          
          after:content-[''] after:absolute after:rounded-full after:outline-none after:duration-300
          after:h-4 after:w-4 after:top-1 after:left-1 
          peer-hover:after:scale-95 peer-checked:after:translate-x-6
          
          after:bg-white dark:after:bg-slate-200
        "
        />
      </label>
    </div>
  );
};

export default ProfileToggle;
