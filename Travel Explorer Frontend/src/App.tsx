import "./App.css";
import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Country from "./pages/Country";
import Compare from "./pages/Compare";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Plans from "./pages/Plans";
import AdminPage from "./pages/AdminPage";
import { useSelector } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import type { RootState } from "./redux/store";
import Destination from "./pages/Destination";
import Globe from "./pages/Globe";

import { useEffect } from "react";
import i18n from "./i18n";

function App() {
  const lang = useSelector((state: RootState) => state.language.language);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
            <Route path="/country/:code" element={<Country />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/globe" element={<Globe />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/plans" element={<Plans />} />
          <Route path="/destination/:name" element={<Destination />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
