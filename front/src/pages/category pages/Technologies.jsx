/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const fetchBlogs = async () => {
  const response = await api.get("/posts");
  return response.data.data; // Ensure we return the actual array of posts
};

const Technologies = () => {
  const [active, setActive] = useState("Blogs");
  const {
    isPending,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchBlogs,
  });

  if (isPending) return <div>Loading ...</div>;
  if (error) return <div>Error is happening!</div>;

  console.log("posts of the list", posts);

  const filteredTechnologies = posts.filter(
    (item) => item.category === "Technology"
  );

  // Filter posts based on active state
  const filteredPosts = filteredTechnologies?.filter((post) =>
    active === "Blogs" ? post.type === "blog" : post.type === "news"
  );

  return (
    <div className="flex justify-center items-center flex-col min-h-[50vh]">
      <div className="flex flex-wrap gap-4 items-center justify-center cursor-pointer relative bg-black rounded-full px-4 py-2 mb-16">
        <div className="relative w-[300px] h-[50px] flex ">
          {/* Animated Background */}
          <motion.div
            className="absolute top-0 left-0 w-[140px] bg-white py-6 rounded-3xl text-center flex items-center justify-center transition-all duration-500"
            animate={{ x: active === "Blogs" ? 0 : 150 }} // Moves background between buttons
          />

          {/* Blogs Button */}
          <button
            onClick={() => setActive("Blogs")}
            className={`relative z-10 w-[140px] mt-1 rounded transition-all duration-300 ${
              active === "Blogs" ? "text-black" : "text-white"
            }`}
          >
            Blogs
          </button>

          {/* News Button */}
          <button
            onClick={() => setActive("News")}
            className={`relative z-10 w-[140px] rounded mt-1 transition-all duration-300 ${
              active === "News" ? "text-black" : "text-white"
            }`}
          >
            News
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 xl:gap-20 justify-center items-center pb-10">
        {filteredPosts.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl flex flex-col text-gray-300 shadow-md bg-black/70 w-[350px] lg:w-[350px] h-[450px] xl:w-[400px]"
          >
            <img
              src={`http://localhost:3000/uploads/${item.image}`}
              alt={item.title}
              className="rounded-t-2xl h-[250px] w-[350px] lg:w-[350px] xl:w-[400px]"
              width={100}
              height={100}
            />
            <p className="text-sm p-3">Haileamlak Waleligne</p>
            <p className="py-2 text-xl font-semibold text-start px-3">
              {item.title}
            </p>
            <p className="text-start px-2 line-clamp-3">{item.description}</p>
            <div className="flex justify-end items-end">
              <Link to={`/posts/${item.id}`}>
                <button className="hover:text-blue-500 underline cursor-pointer mr-2">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technologies;
