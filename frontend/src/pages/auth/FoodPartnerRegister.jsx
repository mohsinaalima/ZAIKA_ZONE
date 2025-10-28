// 🟢 CHANGED FILE: src/pages/auth/FoodPartnerRegister.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth-shared.css';
import api from '../../api/axios'; // 🟢 using centralized axios

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      const res = await api.post("/auth/food-partner/register", {
        name: businessName,
        contactName,
        phone,
        email,
        password,
        address,
      });

      console.log("✅ Registration Success:", res.data);
      navigate("/feed"); // 🟢 redirect to feed after success
    } catch (err) {
      console.error("❌ Registration failed:", err);
      alert(err.response?.data?.message || "Error registering food partner.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner sign up</h1>
          <p className="auth-subtitle">Grow your business with our platform.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label>Business Name</label>
            <input name="businessName" placeholder="Tasty Bites" />
          </div>
          <div className="two-col">
            <div className="field-group">
              <label>Contact Name</label>
              <input name="contactName" placeholder="Jane Doe" />
            </div>
            <div className="field-group">
              <label>Phone</label>
              <input name="phone" placeholder="+91 98765 43210" />
            </div>
          </div>
          <div className="field-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="business@example.com" />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Create password" />
          </div>
          <div className="field-group">
            <label>Address</label>
            <input name="address" placeholder="123 Market Street" />
          </div>
          <button className="auth-submit" type="submit">Create Partner Account</button>
        </form>
        <div className="auth-alt-action">
          Already a partner? <Link to="/food-partner/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
