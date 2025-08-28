import { useState } from "react";
import Nav from "../Components/nav";
import { useNavigate } from "react-router-dom";
import api from "../Config/config";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";
import {useLocation} from "react-router-dom";
function Login() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [isRegister, setIsRegister] = useState(params.get("register") === "true");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (isRegister && (!name || !role))) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        // Register user
        const res = await api.post("/auth/register", {
          name,
          email,
          password,
          role,
        });
        const token = res.data.token || (res.data.data && res.data.data.token);
        const user =
          res.data.data?.user || res.data.user || res.data.data || {};

        if (token) {
          login(user, token);
          localStorage.setItem(
            "userRole",
            (role || user.role || "borrower").toLowerCase()
          );
          toast.success("Registration successful");
          setName("");
          setEmail("");
          setPassword("");
          setRole("");
          navigate("/dashboard");
        } else {
          toast.success(res.data.message || "Registered! Please login.");
          setIsRegister(false);
          setPassword("");
        }
      } else {
        // Login user
        const res = await api.post("/auth/login", { email, password });
        const token = res.data.token || res.data.accessToken;
        const user = res.data.user || res.data.data || {};

        if (token) {
          login(user, token);
          localStorage.setItem(
            "userRole",
            (user.role || "borrower").toLowerCase()
          );
          toast.success("Login successful");
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        } else {
          toast.error("Login failed");
        }
      }
    } catch (error) {
      const msg =
        error.response?.status === 409
          ? error.response.data?.message || "User exists"
          : error.response?.data?.message || "Error, try again";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const toggleFormMode = () => {
    setIsRegister((prevState) => !prevState);
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Nav setIsRegister={setIsRegister} />
      <div className="flex justify-center items-start min-h-screen bg-blue-100 p-28 overflow-y-auto">
        <div className="w-full max-w-md bg-slate-100 p-6 md:p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <img
              className="w-28 h-28 md:w-40 md:h-40 rounded-2xl"
              src="/libraryLogo.jpg"
              alt="Logo"
            />
            <h1 className="font-bold text-center text-black text-2xl md:text-3xl mb-2">
              {isRegister ? "Join Library Hub" : "Welcome Back"}
            </h1>
            <span className="text-center text-sm md:text-lg text-black">
              {isRegister
                ? "Create an account to manage your library activity"
                : "Sign in to access your library dashboard"}
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <label
                  htmlFor="name"
                  className="block mb-1 text-black font-medium"
                >
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-gray-800"
                />

                <label
                  htmlFor="role"
                  className="block mb-1 font-medium text-black"
                >
                  Role:
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-gray-800"
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="borrower">Borrower</option>
                </select>
              </>
            )}

            <label
              htmlFor="email"
              className="block mb-1 font-medium text-black"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-gray-800"
            />

            <label
              htmlFor="password"
              className="block mb-1 font-medium text-black"
            >
              Password:
            </label>
            <div className="relative mb-4">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-gray-800"
              />
              <button
                type="button"
                className="absolute right-2 top-3 text-sm text-white focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="text-center text-sm mb-4 text-black">
              {isRegister ? "Already have an account?" : "Are you new here?"}{" "}
              <span
                className="text-red-700 hover:text-sky-400 cursor-pointer font-semibold"
                onClick={toggleFormMode}
              >
                {isRegister ? "Log In" : "Register"}
              </span>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-sky-400 transition-colors disabled:opacity-50"
            >
              {loading
                ? isRegister
                  ? "Signing Up..."
                  : "Logging In..."
                : isRegister
                ? "Sign Up"
                : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
