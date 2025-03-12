const BlogIntro = () => {
  return (
    <div className="text-white flex flex-col text-center justify-center items-center min-h-[50vh] gap-6 mb-10">
      <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:6xl xl:text-7xl">
        Blog and News Room
      </p>
      <p className="font-semibold text-base lg:text-xl py-10 lg:py-20">
        Here is the top blog and news from Haileamlak Waleligne{" "}
        <br className="hidden lg:block" /> a senior software developer and Team
        leader at Helder Technologies solutions
      </p>

      <div>
        <p className="text-gray-200">
          You can read blog or news and happy reading
        </p>
      </div>
    </div>
  );
};

export default BlogIntro;
