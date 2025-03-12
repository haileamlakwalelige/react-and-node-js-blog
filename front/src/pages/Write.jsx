import { useState } from "react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, description, category, date, author, image };
    console.log("Post Created:", postData);
  };

  return (
    <div className="dotted-background min-h-screen flex items-start justify-center p-4 md:p-8">
      <section className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
          Create a New Post
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Category</label>
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
              <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
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
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Author</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
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
            >
              Create Post
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Write;
