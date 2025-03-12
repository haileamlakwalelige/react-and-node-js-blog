import React from "react";
import post1 from "../../assets/post1.jpg";
import { Link } from "react-router-dom";

const Related = () => {
  return (
    <div>
      <div>
        <div className="w-fit max-w-[350px] flex flex-col shadow-2xl shadow-gray-900 border-gray-600 border-[1px] rounded-2xl p-2">
          <img src={post1} alt="post one" className="h-[300px]  rounded-2xl" />
          <p className="font-semibold py-2 text-xl md:text-2xl lg:text-3xl text-center">
            In Ubuntu, you can record your screen
          </p>
          <p className="line-clamp-2">
            or video using various methods. Here are some of the best options:
            1. Built-in GNOME Screen Recorder (For Ubuntu 22.04 and later) If
            you're using GNOME (default in Ubuntu), you can use the built-in
            screen recorder: Steps: Press Ctrl + Alt + Shift + R to start
            recording. A red dot will appear in the top-right corner, indicating
            recording is in progress. Press the same shortcut (Ctrl + Alt +
            Shift + R) again to stop recording. The recorded video is saved in
            ~/Videos/Screencasts. ⚠️ This built-in recorder only records the
            entire screen and does not support audio recording.
          </p>
          <div className="flex justify-end items-end mt-2">
            <Link to="">
              <button className="hover:text-blue-500 underline cursor-pointer">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Related;
