import React from "react";
import BlogIntro from "../components/blogs/BlogIntro";
import BlogList from "../components/blogs/BlogList";

const Home = () => {
  return (
    <div>
      <div>
        <BlogIntro />
        <BlogList />
      </div>
    </div>
  );
};

export default Home;
