import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UserLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        loginData, 
        { withCredentials: true }, 
      );

      if (response.data) {
        console.log("Successfully logged in");
        onLoginSuccess(response.data.user);
        navigate("/feed");
      }
    } catch (err) {  
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message,
      );
    }
  };

  return (
    // min-h-screen and bg-brand-dark create the full-page dark background 🌌
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      {/* The card uses backdrop-blur and a subtle border for a glassmorphism effect ✨ */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400">
            Sign in to continue your food journey.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-slate-300 ml-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-slate-300 ml-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
              required
            />
          </div>

          {/* bg-brand-blue uses your custom theme color! 🔵 */}
          <button
            className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-slate-400 text-sm">
          New here?{" "}
          <a
            href="/user/register"
            className="text-brand-blue hover:underline font-medium ml-1"
          >
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;