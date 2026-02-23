import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ChooseLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 text-center">
        <h1 className="text-3xl font-bold text-white mb-6 text-brand-blue">
          Welcome Back
        </h1>
        <p className="text-slate-400 mb-8">Choose your portal to continue.</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/user-login")}
            className="bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Sign In as Foodie 🍕
          </button>

          <button
            onClick={() => navigate("/partner-login")}
            className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
          >
            Sign In as Chef 👨‍🍳
          </button>
        </div>

        <p className="mt-8 text-slate-400 text-sm">
          New here?{" "}
          <Link to="/register" className="text-brand-blue hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChooseLogin;