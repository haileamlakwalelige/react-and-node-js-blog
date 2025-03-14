import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AppLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login"; // This updates dynamically
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("auth_token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [isLoggedIn]);

  return (
    <div className="dotted-background overflow-y-hidden">
      <div className={`${isLogin ? "hidden" : "flex"}`}>
        {!isLogin && <Navbar />}
      </div>
      <div className="pt-40">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/write" element={<Write />} />
          </Route>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<Single />} />
        </Routes>
      </div>
      <div className={`${isLogin ? "hidden" : "flex"}`}>
        {!isLogin && <Footer />}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
