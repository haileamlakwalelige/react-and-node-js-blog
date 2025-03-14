import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const AppLayout = () => {
  const location = useLocation(); 
  const isLogin = location.pathname === "/login"; // This updates dynamically

  return (
    <div className="dotted-background overflow-y-hidden">
      <div className={`${isLogin ? "hidden" : "flex"}`}>
        {!isLogin && <Navbar />}
      </div>
      <div className="pt-40">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Login />} />
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
