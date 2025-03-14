import React from "react";
import post1 from "../assets/profile.png";
import Related from "../components/related/Related";
import api from "../api/api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchSingleBlog = async (id) => {
  const response = await api.get(`http://localhost:3000/api/posts/${id}`);
  return response.data; // Ensure you return the data
};

const useSingleBlog = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchSingleBlog(id),
    enabled: !!id, // Ensures the query only runs if `id` is available
  });
};

const Single = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useSingleBlog(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("blogs single", blog.data[0]);

  return (
    <div className="text-white min-h-screen">
      <div className="flex px-2 sm:px-4 md:px-8 lg:px-20 xl:px-28 flex-wrap lg:flex-nowrap gap-4 md:gap-8 lg:gap-12 xl:gap-16 justify-between">
        <div className="lg:w-2/3">
          <img
            // src={post1}
            src={`http://localhost:3000/uploads/${blog.data[0].image}`}
            alt={blog.data[0].title}
            className="h-[280px] w-full rounded-2xl"
          />
          <div className="flex gap-5 items-center">
            <img
              src={post1}
              alt="Haileamalk Waleligne"
              className="h-[60px] w-[60px] rounded-full mt-2"
            />
            <div>
              <p className="font-extrabold text-lg">Haileamlak Waleligne</p>
              <p>{blog.data[0].date}</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl py-10">
              {blog.data[0].title}
            </p>
            <p>{blog.data[0].description}</p>
          </div>
        </div>
        <div className="lg:w-1/3 flex gap-5 flex-col">
          <Related />
          <Related />
        </div>
      </div>
    </div>
  );
};

export default Single;
