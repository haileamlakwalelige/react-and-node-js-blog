// src/Login.js
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful");
      Cookies.set("isLoggedIn", "true", { expires: 7 });
      Cookies.set("auth_token", data.token, { expires: 7 });
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed. Try again!");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center top-0 -mt-40 h-screen overflow-y-hidden bg-gradient-to-r from-blue-500 to-teal-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-white p-8 rounded-lg shadow-lg w-96 transition-transform transform ${
          isLoading ? "scale-95" : ""
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back!
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-bold text-sm">
            {error.response?.data?.message || "Login failed. Try again!"}
          </p>
        )}

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2 text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2 text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={`w-full p-3 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-2 cursor-pointer rounded-lg hover:bg-blue-700 transition duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
