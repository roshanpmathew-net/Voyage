import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminMail = import.meta.env.VITE_EMAIL

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  
}

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();

  const handleLogin = (cred: string) => {
    const decoded = jwtDecode<GoogleUser>(cred);
    console.log(decoded)

    if(decoded.email == AdminMail )
    {
      login({
      name: decoded.name,
      img_url: decoded.picture || null,
      islogged: true,
      isAdmin:true,
      email: decoded.email
    });
    }
    else{
        login({
      name: decoded.name,
      img_url: decoded.picture || null,
      islogged: true,
      isAdmin:false,
      email: decoded.email
    });
    }

    

    nav("/");
  };

  return (
    <div className="min-h-screen bg-[url('./images/Login-bg.avif')] bg-cover bg-center">
      <div className="min-h-screen bg-white/30 dark:bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center px-4 py-8">        
        <div className="flex flex-col items-center gap-4 mb-8">
          <img
            className="h-20 w-20 rounded-3xl shadow-lg"
            src="./images/Logo.png"
            alt="Voyage Logo"
          />

          <div className="text-center">
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Voyage
            </h1>

            <p className="mt-2 text-sm md:text-base text-black/90 dark:text-white/90">
              Your gateway to the world's finest destinations
            </p>
          </div>
        </div>
        <div
          className="
            w-full
            max-w-md
            bg-white/95
            dark:bg-slate-900/95
            border border-transparent
            dark:border-slate-800
            backdrop-blur-md
            rounded-2xl
            shadow-2xl
            p-8
            flex
            flex-col
            gap-6
          "
        >
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(response) => {
                handleLogin(response.credential!);
              }}
              onError={() => console.error("Login failed")}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-400 dark:bg-slate-700"></div>

            <p className="text-xs font-semibold tracking-widest text-gray-500 dark:text-slate-400 whitespace-nowrap">
              OR CONTINUE WITH
            </p>

            <div className="h-px flex-1 bg-gray-400 dark:bg-slate-700"></div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-slate-350"
              >
                Email
              </label>

              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="mt-2 bg-transparent dark:bg-slate-950 dark:border-slate-800"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 dark:text-slate-350"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-2 bg-transparent dark:bg-slate-950 dark:border-slate-800"
              />
            </div>

            <Button
              className="
                w-full
                h-11
                bg-[#2563EB]
                hover:bg-[#1D4ED8]
                text-white
                transition-all
                duration-300
                font-medium
                cursor-pointer
                shadow-md
              "
            >
              Sign in to Voyage
            </Button>

            {/* Signup */}
            <p className="text-center text-sm text-gray-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#2563EB] dark:text-blue-400 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs md:text-sm tracking-[0.3em] text-white/90 font-medium text-center">
          TRUSTED BY TRAVELERS WORLDWIDE
        </p>
      </div>
    </div>
  );
};

export default Login;