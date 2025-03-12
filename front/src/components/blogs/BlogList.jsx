import React, { useState } from "react";
import { motion } from "framer-motion";
import post1 from "../../assets/post1.jpg";
import { Link } from "react-router-dom";

const BlogList = () => {
  const data = [
    {
      id: "clabc1234567890abcdef12345",
      title: "Introduction to Prisma",
      slug: "introduction-to-prisma",
      description:
        "Prisma is a modern database toolkit that simplifies database access and management for developers. It provides an intuitive API for working with databases, allowing you to focus on building your application rather than writing complex SQL queries. With Prisma, you can easily define your database schema, generate type-safe clients, and perform CRUD operations effortlessly. Whether you're working with PostgreSQL, MySQL, or SQLite, Prisma streamlines the development process and enhances productivity. This guide will walk you through the basics of setting up Prisma in your project and getting started with its powerful features.",
      authorId: "Haileamlak Waleligne",
      category: "BLOG",
    },
    {
      id: "clabc1234567890abcdef12346",
      title: "Advanced TypeScript Techniques",
      slug: "advanced-typescript-techniques",
      description:
        "TypeScript has become a cornerstone of modern web development, offering strong typing and advanced features that enhance JavaScript development. In this post, we'll explore advanced TypeScript techniques such as decorators, conditional types, and mapped types. You'll learn how to leverage these features to write more robust and maintainable code. We'll also dive into best practices for structuring large-scale TypeScript projects and optimizing performance. Whether you're a seasoned developer or just getting started with TypeScript, this guide will help you take your skills to the next level.",
      authorId: "Haileamlak Waleligne",
      category: "BLOG",
    },
    {
      id: "clabc1234567890abcdef12347",
      title: "Getting Started with Next.js",
      slug: "getting-started-with-nextjs",
      description:
        "Next.js is a powerful React framework that enables developers to build server-rendered, statically generated, and hybrid web applications with ease. In this guide, we'll cover the basics of setting up a Next.js project, creating pages, and using its built-in routing system. You'll also learn how to fetch data, optimize performance, and deploy your Next.js application. Whether you're building a simple blog or a complex web app, Next.js provides the tools and flexibility you need to succeed. By the end of this tutorial, you'll have a solid foundation to start building your own Next.js projects.",
      authorId: "Haileamlak Waleligne",
      category: "BLOG",
    },
    {
      id: "clabc1234567890abcdef12348",
      title: "Latest Tech News: AI Breakthroughs",
      slug: "latest-tech-news-ai-breakthroughs",
      description:
        "Artificial intelligence continues to revolutionize industries, with groundbreaking advancements being made in natural language processing, computer vision, and machine learning. In this post, we'll explore the latest AI breakthroughs, including OpenAI's GPT-4, Google's Bard, and advancements in autonomous systems. We'll also discuss the ethical implications of AI and how these technologies are shaping the future of work, healthcare, and education. Stay informed about the cutting-edge developments in AI and how they might impact your life and career. This is a must-read for anyone interested in the future of technology.",
      authorId: "Haileamlak Waleligne",
      category: "NEWS",
    },
    {
      id: "clabc1234567890abcdef12349",
      title: "Understanding GraphQL",
      slug: "understanding-graphql",
      description:
        "GraphQL is a query language for APIs that provides a more efficient and flexible alternative to REST. In this comprehensive guide, we'll cover the fundamentals of GraphQL, including its schema definition language, queries, mutations, and subscriptions. You'll learn how to set up a GraphQL server, integrate it with your frontend, and optimize performance using tools like Apollo and Relay. We'll also explore real-world use cases and best practices for adopting GraphQL in your projects. Whether you're new to GraphQL or looking to deepen your understanding, this guide has everything you need to get started.",
      authorId: "Haileamlak Waleligne",
      category: "BLOG",
    },
    {
      id: "clabc1234567890abcdef12350",
      title: "Top Programming Languages in 2023",
      slug: "top-programming-languages-2023",
      description:
        "The programming landscape is constantly evolving, with new languages and frameworks emerging every year. In this post, we'll take a look at the top programming languages in 2023, including Python, JavaScript, Rust, and Go. We'll discuss the strengths and weaknesses of each language, their use cases, and why they're popular among developers. Whether you're a beginner choosing your first language or an experienced developer looking to expand your skill set, this guide will help you make informed decisions about which languages to learn and use in your projects. Stay ahead of the curve with this comprehensive overview.",
      authorId: "Haileamlak Waleligne",
      category: "NEWS",
    },
  ];

  const [active, setActive] = useState("Blogs");

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-wrap gap-4 items-center justify-center cursor-pointer relative bg-black rounded-full px-4 py-2 mb-16">
        <div className="relative w-[300px] h-[50px] flex ">
          {/* Animated Background */}
          <motion.div
            className="absolute top-0 left-0 w-[140px] bg-white py-6  rounded-3xl text-center flex  items-center justify-center transition-all duration-500"
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
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl flex flex-col  text-gray-300 shadow-md bg-black/70 w-[350px]  lg:w-[350px] h-[450px] xl:w-[400px]"
          >
            <img
              src={post1}
              alt="First post"
              className="rounded-t-2xl h-[250px] w-[350px]  lg:w-[350px] xl:w-[400px]"
              width={100}
              height={100}
            />
            <p className="text-sm p-3">{item.authorId}</p>
            <p className="py-2 text-xl font-semibold text-start px-3">
              {" "}
              {item.title}
            </p>
            <p className="text-start px-2  line-clamp-3">{item.description}</p>
            <div className="flex justify-end items-end">
              <Link to={`/posts/${item.id}`}>
                <button className="hover:text-blue-500 underline cursor-pointer">
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

export default BlogList;
