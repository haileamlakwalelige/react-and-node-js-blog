import React from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const fetchRelatedBlogs = async () => {
  const response = await api.get("/posts");
  return response;
};
const Related = ({ category, itemId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["related"],
    queryFn: fetchRelatedBlogs,
  });

  if (isPending) return <div>Loading ...</div>;
  if (error) return <div>Error is happening!</div>;

  const relatedBlogs = data?.data?.data?.filter(
    (item) => item.category === category
  );

  const filteredBlogs = relatedBlogs.filter((item) => item.id !== itemId);
  return (
    <div>
      {filteredBlogs.slice(0, 2).map((item) => (
        <div key={item.id}>
          <div className="w-fit max-w-[350px] flex flex-col shadow-2xl shadow-gray-900 border-gray-600 border-[1px] rounded-2xl p-2">
            <img
              src={`http://localhost:3000/uploads/${item.image}`}
              alt="post one"
              className="h-[300px]  rounded-2xl"
            />
            <p className="font-semibold py-2 text-xl md:text-2xl lg:text-3xl text-center">
              {item.title}
            </p>
            <p className="line-clamp-2">{item.description}</p>
            <div className="flex justify-end items-end mt-2">
              <Link to={`/posts/${item.id}`}>
                <button className="hover:text-blue-500 underline cursor-pointer">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Related;
