// ULTRA MODERN Login.tsx

import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  LockKeyhole,
  Mail,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { loginUser } from "../api/auth.api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = await loginUser(
        formData
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[520px] rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Top */}
        <div className="px-10 pt-10 pb-8 border-b border-white/10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-[28px] bg-violet-600/20 border border-violet-500/20 flex items-center justify-center shadow-xl">
              <Sparkles
                size={34}
                className="text-violet-400"
              />
            </div>

            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                TaskFlow
              </h1>

              <p className="text-gray-400 mt-2 text-[15px]">
                Smart productivity workspace
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-10 py-10">
          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-4xl font-black leading-tight">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 mt-3 text-[16px] leading-7">
              Login to continue managing
              your tasks and workflow.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Email Address
              </label>

              <div className="h-[66px] rounded-[24px] bg-[#111827] border border-white/10 px-6 flex items-center gap-4 focus-within:border-violet-500 transition-all duration-300">
                <Mail
                  size={22}
                  className="text-gray-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-[17px]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Password
              </label>

              <div className="h-[66px] rounded-[24px] bg-[#111827] border border-white/10 px-6 flex items-center gap-4 focus-within:border-violet-500 transition-all duration-300">
                <LockKeyhole
                  size={22}
                  className="text-gray-500"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-[17px]"
                />
              </div>
            </div>

            {/* Button */}
            <button className="group w-full h-[66px] rounded-[24px] bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-lg font-bold shadow-2xl hover:scale-[1.01] flex items-center justify-center gap-3">
              Login

              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition"
              />
            </button>
          </form>

          {/* Bottom */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-[15px]">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-violet-400 hover:text-violet-300 font-semibold transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;