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
import Technologies from "./pages/category pages/Technologies";
import Leadership from "./pages/category pages/Leadership";
import Productivity from "./pages/category pages/Productivity";
import Creativity from "./pages/category pages/Creativity";
import Growth from "./pages/category pages/Growth";
import Edit from "./pages/Edit";

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
          <Route path="/post/edit/:id" element={<Edit />} />
          <Route path="/technology" element={<Technologies />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/productivity" element={<Productivity />} />
          <Route path="/creativity" element={<Creativity />} />
          <Route path="/growth" element={<Growth />} />
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
