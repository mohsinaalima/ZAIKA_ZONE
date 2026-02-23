import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        loginData,
        { withCredentials: true },
      );

      if (response.data) {
        // ✅ Map 'foodPartner' to the 'user' state with 'partner' role
        onLoginSuccess({
          ...response.data.foodPartner,
          role: "partner",
        });
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
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Partner Portal</h1>
          <p className="text-slate-400">
            Manage your kitchen and share your dishes.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300 ml-1">
              Business Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300 ml-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              required
            />
          </div>

          <button className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20">
            Sign In as Partner
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;