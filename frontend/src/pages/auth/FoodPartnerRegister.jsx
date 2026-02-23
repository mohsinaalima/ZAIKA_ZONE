import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerRegister = ({ onBack }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      contactName: e.target.contactName.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        data,
      );
      if (response.data) {
        navigate("/login");
      }
    } catch (err) {
      console.error(
        "Partner registration failed:",
        err.response?.data?.message || err.message,
      );
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white mb-4 text-sm flex items-center gap-1 transition-colors"
        >
          ← Back to choice
        </button>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-white">Partner Portal</h1>
          <p className="text-slate-400 text-sm">
            Register your kitchen to start sharing dishes.
          </p>
        </header>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-300 ml-1">
              Business Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Tasty Kitchen"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-300 ml-1">
              Chef Name
            </label>
            <input
              name="contactName"
              type="text"
              placeholder="Chef Mario"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-300 ml-1">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+1..."
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-300 ml-1">
              Address
            </label>
            <input
              name="address"
              type="text"
              placeholder="123 Food Lane"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-300 ml-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-300 ml-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              required
            />
          </div>
          <button
            className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg mt-4 transition-all active:scale-[0.98]"
            type="submit"
          >
            Register Partner
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;