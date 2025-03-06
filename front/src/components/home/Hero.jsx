import { MoveRightIcon } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-20">
      <div className="flex flex-col justify-center items-center min-h-[82vh] max-w-7xl mx-auto">
        <h1 className="text-center">
          <span className="gradient-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-2 block">
            Welcome to My Blog
          </span>
          <div className="flex flex-row items-center justify-center">
            <span className="gradient-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold">
              Dive into Creativity
            </span>
          </div>
        </h1>
        <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl text-center mt-6 sm:mt-8 max-w-2xl">
          Explore insights, tips, and stories that will inspire and spark your
          imagination.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 sm:mt-12 w-full sm:w-auto">
          <button className="flex bg-green-600 text-white py-2 rounded text-base sm:text-lg px-8 sm:px-10 hover:text-white hover:bg-black transition-all duration-300 w-full sm:w-auto">
            Start Reading <MoveRightIcon className="ml-2 animate-bounce-x" />
          </button>
          <button className="bg-black flex text-white py-2 rounded text-base sm:text-lg px-8 sm:px-10 hover:bg-green-600 hover:text-white transition-all duration-300 w-full sm:w-auto">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
