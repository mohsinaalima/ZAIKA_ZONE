import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 text-center">
      {/* Visual background element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
          ZAIKA <span className="text-brand-blue">ZONE</span> 🍕
        </h1>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
          Discover the best local chefs through short, sizzling food reels. Your
          next favorite meal is just a swipe away.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="px-10 py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/25"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all backdrop-blur-md"
          >
            I have an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;