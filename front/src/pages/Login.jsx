// src/Login.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    console.log(data);
    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle login logic here
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center top-0 -mt-40 h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-white p-8 rounded-lg shadow-lg w-96 transition-transform transform ${
          isSubmitting ? "scale-95" : ""
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back!
        </h2>

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
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
