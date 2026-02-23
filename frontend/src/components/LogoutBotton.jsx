import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ role, onLogoutSuccess }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
   try {
      // ✅ Dynamic endpoint based on role
      const endpoint = role === 'partner' 
        ? 'food-partner/logout' 
        : 'user/logout';
      
      await axios.post(`http://localhost:3000/api/auth/${endpoint}`, {}, { withCredentials: true });
      
      // ✅ Clear App state and redirect
      onLogoutSuccess();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest"
    >
      Logout
    </button>
  );
};

export default LogoutButton;