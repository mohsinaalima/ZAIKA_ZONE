// 🟢 CHANGED FILE: src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ChooseRegister from "../pages/auth/ChooseRegister";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import BottomNav from "../components/BottomNav";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 🟢 DEFAULT: when you open localhost:5173 → goes to register chooser */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route path="/register" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

        {/* 🟢 Feed page → after login redirect here */}
        <Route path="/feed" element={<><Home /><BottomNav /></>} />
        <Route path="/saved" element={<><Saved /><BottomNav /></>} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
