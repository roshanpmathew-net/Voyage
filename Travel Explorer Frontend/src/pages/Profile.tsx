import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Prefernces from "@/ui-components/Profile/Prefernces";
import ProfileRecentActivity from "@/ui-components/Profile/ProfileRecentActivity";
import UtilityCard from "@/ui-components/Profile/UtilityCard";
import { LogOutIcon, Pencil, ShieldUser, Heart, EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const FavCount = useSelector((state: RootState) => state.favorites.favorites);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col px-3 gap-5 sm:px-5 mt-5">
      <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-black dark:bg-slate-900">
        <div className="h-24 sm:h-28 lg:h-36 bg-slate-200 dark:bg-blue-700" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            <div className="-mt-12 sm:-mt-14 lg:-mt-16">
              <img
                src={user?.img_url || "./images/user.webp"}
                alt={user?.name}
                className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
            </div>

            <div className="pb-2 mt-2 sm:mt-4">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {user?.name}
              </h1>

              <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 break-all">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex flex-row gap-3 sm:gap-4 w-full lg:w-auto">
            {user?.isAdmin && (
              <Link to={"/admin"}>
                <Button className="cursor-pointer  w-full sm:w-auto flex items-center gap-2 bg-[#2563EB] rounded-lg px-4 sm:px-6 py-5 hover:bg-[#1D4ED8] dark:text-white">
                  <ShieldUser size={18} />
                  Admin Panel
                </Button>
              </Link>
            )}

            <Button className="cursor-pointer w-full sm:w-auto flex items-center gap-2 rounded-lg px-4 sm:px-6 py-5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:text-white">
              <Pencil size={18} />
              Edit Profile
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="cursor-pointer w-full sm:w-auto flex items-center gap-2 rounded-lg border-red-500 px-4 sm:px-6 py-5 text-red-600 hover:bg-red-50"
            >
              <LogOutIcon size={18} />
              Logout
            </Button>
          </div>
          <div className="flex sm:hidden gap-3 w-full">
            {user?.isAdmin && (
              <Link to={"/admin"}>
                <Button className=" cursor-pointer w-fit sm:w-auto flex items-center gap-2 bg-[#2563EB] rounded-lg px-4 sm:px-6 py-5 hover:bg-[#1D4ED8] dark:text-white">
                  <ShieldUser size={18} />
                </Button>
              </Link>
            )}

            <Button className="cursor-pointer w-fit sm:w-auto flex items-center gap-2 rounded-lg px-4 sm:px-6 py-5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:text-white">
              <Pencil size={18} />
            </Button>

            <Button
              variant="outline"
              onClick={handleLogout}
              className=" cursor-pointer  w-fit sm:w-auto flex items-center gap-2 rounded-lg border-red-500 px-4 sm:px-6 py-5 text-red-600 hover:bg-red-50"
            >
              <LogOutIcon size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-center items-stretch w-full mt-5">
        <div className="w-full md:w-1/2 flex justify-center">
          <UtilityCard
            headerText="Favorite Countries Count"
            icon={<Heart fill="#2563EB" color="transparent" />}
            value={FavCount.length}
            max={100}
          />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <UtilityCard
            headerText="Recently Viewed Count"
            icon={<EyeIcon color="#2563EB" />}
            value={50}
            max={100}
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-6 justify-center mt-4 mb-10 px-4 md:px-0">
        <div className="w-full md:w-[60%]">
          <ProfileRecentActivity />
        </div>
        <div className="w-full md:w-[40%]">
          <Prefernces />
        </div>
      </div>
    </div>
  );
};

export default Profile;
