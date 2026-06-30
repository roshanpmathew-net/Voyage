import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginDropDown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="flex items-center gap-3 cursor-pointer rounded-full focus:outline-none" />
          }
        >
          <img
            src={user?.img_url ?? "./images/user.webp"}
            alt={user?.name}
            title={user?.name}
            className="h-10 w-10 rounded-full border"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {user?.isAdmin && (
              <Link to={"/admin"}>
                <DropdownMenuItem className={"cursor-pointer"}>
                  Admin Panel
                </DropdownMenuItem>
              </Link>
            )}

            <Link to={"/profile"}>
              <DropdownMenuItem className={"cursor-pointer"}>
                Profile
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              variant="destructive"
              className={"cursor-pointer"}
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LoginDropDown;
