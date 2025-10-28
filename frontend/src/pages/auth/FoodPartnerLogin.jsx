// 🟢 CHANGED FILE: src/pages/auth/FoodPartnerLogin.jsx
import React from 'react';
import '../../styles/auth-shared.css';
import api from '../../api/axios.js'; // 🟢 using centralized axios
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await api.post("/auth/food-partner/login", { email, password });
      console.log("✅ Login Success:", res.data);

      // optional: store token
      // localStorage.setItem("token", res.data.token);

      navigate("/feed"); // 🟢 redirect to feed page
    } catch (err) {
      console.error("❌ Login failed:", err);
      alert(err.response?.data?.message || "Error logging in.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage your food content.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="business@example.com" />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Password" />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New partner? <a href="/food-partner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
