import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {  Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../redux/langSlice";
import type { RootState, AppDispatch } from "@/redux/store";

const LangDropDown = () => {
  const dispatch = useDispatch<AppDispatch>();;

  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

 const changeLanguage = (lang: string) => {
  dispatch(setLanguage(lang));
};
  const languages = [
    {
      code: "en",
      label: "English",
    },
    {
      code: "hi",
      label: "हिन्दी",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-lg
              border border-gray-200 dark:border-slate-800
              bg-white dark:bg-slate-900
              hover:bg-gray-50 dark:hover:bg-slate-800
              transition-colors
              text-sm font-medium text-slate-800 dark:text-slate-200
              cursor-pointer
            "
          />
        }
      >
        <span>{currentLanguage.toUpperCase()}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40"
      >
        <DropdownMenuGroup>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className="cursor-pointer flex items-center justify-between"
            >
              <span>{language.label}</span>

              {currentLanguage === language.code && (
                <Check size={16} />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangDropDown;