/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { z } from "zod";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Define validation schema using Zod
const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().nonempty("Category is required"),
  type: z.string().nonempty("Type is required"),
  image: z.any().optional(), // Optional, in case there's no image selected
  date: z.string().nonempty("Date is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const fetchSingleBlog = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response;
};

const Edit = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  // Fetch data using useQuery
  const { isPending, error, data } = useQuery({
    queryKey: ["edit_blog", id],
    queryFn: () => fetchSingleBlog(id),
  });

//   console.log("data of th edit blog", data.data.data);
//   console.log("Category:", data.data.data[0]?.category);
//   console.log("Title:", data.data.data[0]?.title);
//   console.log("Description:", data.data.data[0]?.description);

  // If the data is available, update the state with the fetched data
  useEffect(() => {
    if (data && data.data && data.data.data.length > 0) {
      setTitle(data.data.data[0].title);
      setCategory(data.data.data[0]?.category);
      setType(data.data.data[0].type);
      setDate(data.data.data[0].date);
      setDescription(data.data.data[0].description);
    }
  }, [data]);

  console.log("data of th edit title", title);

  if (isPending) return <div>Loading ...</div>;
  if (error) return <div>Error is happening!</div>;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const validateImage = (image) => {
    if (image && image.size > 5 * 1024 * 1024) {
      setMessage("Image size exceeds 5MB.");
      return false;
    }
    if (image && !image.type.startsWith("image/")) {
      setMessage("Only image files are allowed.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = blogSchema.safeParse({
      title,
      category,
      type,
      image,
      date,
      description,
    });

    if (!validationResult.success) {
      setMessage(validationResult.error.errors[0].message);
      return;
    }

    if (image && !validateImage(image)) {
      return; // Stop if the image is invalid
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("date", date);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      setMessage("");

      const response = await api.put(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Post updated successfully!");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error updating data:", error);
      if (error.response) {
        setMessage(
          error.response.data.error ||
            "Failed to update post. Please try again."
        );
      } else {
        setMessage("Failed to update post. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="dotted-background min-h-screen flex items-start justify-center p-4 md:p-8">
      <section className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
          Edit Post
        </h2>

        {message && <p className="text-center text-red-500">{message}</p>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a Category</option>
                <option value="Technology">Technology</option>
                <option value="Leadership">Leadership</option>
                <option value="Productivity">Productivity</option>
                <option value="Creativity">Creativity</option>
                <option value="Growth">Growth</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium my-2">
                Type
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select a Type</option>
                <option value="blog">Blog</option>
                <option value="news">News</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 p-3 rounded-lg"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          {/* Full Width Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Edit;
