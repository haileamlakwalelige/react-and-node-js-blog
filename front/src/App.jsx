import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App = () => {
  const isLogin = window.location.pathname === "/login";
  return (
    <div className="dotted-background">
      <BrowserRouter>
        {!isLogin && <Navbar />}
        <div className="pt-40">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<Single />} />
          </Routes>
        </div>
        {!isLogin && <Footer />}
      </BrowserRouter>
    </div>
  );
};

export default App;
