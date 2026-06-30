import { Button } from "@/components/ui/button";
import Featured from "@/ui-components/HomePage/Featured";
import Recents from "@/ui-components/HomePage/Recents";
import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-linear-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-11 py-12 md:py-16 overflow-hidden gap-10 lg:gap-6">
        
        <div className="max-w-2xl py-4 md:py-10 flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
          
          <p className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 py-2 px-4 rounded-full w-fit text-xs font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <PlaneTakeoff size={14} />
            {t("next_generation_travel_planning")}
          </p>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
              {t("hero_title_part1")}
            </h1>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
               {t("hero_title_part2")}{" "}
              <span className="text-[#2563EB]">
                Voyage
              </span>
            </h1>
          </div>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
             {t("hero_description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
            <Button
              className="
                h-12
                px-8
                bg-[#2563EB]
                hover:bg-[#1D4ED8]
                text-white
                shadow-md
                transition-all
                duration-300
                hover:shadow-lg
                cursor-pointer
                w-full
                sm:w-auto
              "
              onClick={() => navigate('/explore')}
            >
              {t("start_exploring")}
              <ArrowRight className="ml-1" size={18} />
            </Button>

            <Button
              variant="outline"
              className="
                h-12
                px-8
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-900
                text-slate-700
                dark:text-slate-200
                hover:bg-slate-900
                dark:hover:bg-slate-100
                hover:text-white
                dark:hover:text-slate-900
                transition-all
                duration-300
                cursor-pointer
                w-full
                sm:w-auto
              "
            >
              {t("how_it_works")}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center w-full lg:w-auto max-w-sm md:max-w-md lg:max-w-none">
          <img
            className="
              h-64
              sm:h-96
              lg:h-130
              w-auto
              object-contain
              drop-shadow-2xl
              rounded-lg
            "
            src="./images/globe.png"
            alt="Globe"
          />
        </div>
      </div>

      <div className="w-full px-6 md:px-11 flex flex-col mt-4 mb-10">
        <Featured/>
      </div> 

      <div className="w-full bg-linear-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 px-6 md:px-11 flex flex-col mt-4 mb-10">
        <Recents/>
      </div>
    </div>
  );
};

export default Home;