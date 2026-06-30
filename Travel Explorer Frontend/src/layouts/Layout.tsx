import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../ui-components/Common/Navbar/Navbar";

export default function Layout() {
  const { pathname } = useLocation();
  const isGlobePage = pathname === "/globe";

  return (
    <>
      <Navbar />
      <div className={isGlobePage ? "pt-0 max-md:pt-[73px]" : "pt-[73px]"}>
        <Outlet />
      </div>
    </>
  );
}