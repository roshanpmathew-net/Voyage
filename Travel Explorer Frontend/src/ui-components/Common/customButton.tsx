import type { ReactNode } from "react";

interface CustomButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

function CustomButton({
  active,
  onClick,
  children,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all cursor-pointer ${
        active
          ? "bg-white dark:bg-slate-700 shadow text-blue-600"
          : "text-gray-500"
      }`}
    >
      {children}
    </button>
  );
}

export default CustomButton;