import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

// Auth & General Pages
import Landing from "./pages/general/Landing"; // We will create this next!
import Home from "./pages/general/Home";
import ChooseLogin from "./pages/auth/ChooseLogin";
import ChooseRegister from "./pages/auth/ChooseRegister";
import UserLogin from "./pages/auth/UserLogin";
import FoodPartnerLogin from "./pages/auth/FoodPartnerLogin";
import BottomNav from "./components/BottomNav";
import CreateFood from "./pages/food-partner/CreateFood";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // handling token of loggin in -
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/check-auth", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogoutSuccess = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-brand-dark flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue'></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. The Entrance: If not logged in, show Landing. If logged in, go to Feed. */}
        <Route
          path='/'
          element={user ? <Navigate to='/feed' /> : <Landing />}
        />

        {/* 2. The Auth Flow */}
        <Route path='/login' element={<ChooseLogin />} />
        <Route path='/register' element={<ChooseRegister />} />
        <Route
          path='/user-login'
          element={<UserLogin onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path='/partner-login'
          element={<FoodPartnerLogin onLoginSuccess={handleLoginSuccess} />}
        />

        {/* 3. The Main App: Only accessible if logged in (optional check) */}
        <Route
          path='/feed'
          element={<Home user={user} onLogoutSuccess={handleLogoutSuccess} />}
        />
        {/* Add this line with your other routes */}
        <Route path='/upload' element={<CreateFood />} />
      </Routes>

      {/* Only show BottomNav if the user is actually logged in and on the feed */}
      {user && <BottomNav />}
    </BrowserRouter>
  );
}

export default App;
