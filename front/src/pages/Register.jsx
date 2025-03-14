import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import toast, { Toaster } from "react-hot-toast";

// Zod Schema for Validation
const schema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // React Query Mutation for API request
  const mutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/register", userData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(error.response?.data || "Registration failed!");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-white p-8 rounded-lg shadow-lg w-96 transition-transform transform ${
          mutation.isLoading ? "scale-95" : ""
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome To Our Blog!
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isLoading}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 ${
            mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {mutation.isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
