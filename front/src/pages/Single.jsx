import React from "react";
import post1 from "../assets/post1.jpg";
import Related from "../components/related/Related";

const Single = () => {
  return (
    <div className="text-white min-h-screen">
      <div className="flex px-2 sm:px-4 md:px-8 lg:px-20 xl:px-28 flex-wrap lg:flex-nowrap gap-4 md:gap-8 lg:gap-12 xl:gap-16 justify-between">
        <div className="lg:w-2/3">
          <img
            src={post1}
            alt="Post one"
            className="h-[280px] w-full rounded-2xl"
          />
          <div className="flex gap-5 items-center">
            <img
              src={post1}
              alt="Author"
              className="h-[60px] w-[60px] rounded-full mt-2"
            />
            <div>
              <p className="font-extrabold text-lg">John</p>
              <p>Feb 24, 2024</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl py-10">
              This built-in recorder
            </p>
            <p>
              In Ubuntu, you can record your screen or video using various
              methods. Here are some of the best options: 1. Built-in GNOME
              Screen Recorder (For Ubuntu 22.04 and later) If you're using GNOME
              (default in Ubuntu), you can use the built-in screen recorder:
              Steps: Press Ctrl + Alt + Shift + R to start recording. A red dot
              will appear in the top-right corner, indicating recording is in
              progress. Press the same shortcut (Ctrl + Alt + Shift + R) again
              to stop recording. The recorded video is saved in
              ~/Videos/Screencasts. ⚠️ This built-in recorder only records the
              entire screen and does not support audio recording.
            </p>
            <p className="py-10">
              In Ubuntu, you can record your screen or video using various
              methods. Here are some of the best options: 1. Built-in GNOME
              Screen Recorder (For Ubuntu 22.04 and later) If you're using GNOME
              (default in Ubuntu), you can use the built-in screen recorder:
              Steps: Press Ctrl + Alt + Shift + R to start recording. A red dot
              will appear in the top-right corner, indicating recording is in
              progress. Press the same shortcut (Ctrl + Alt + Shift + R) again
              to stop recording. The recorded video is saved in
              ~/Videos/Screencasts. ⚠️ This built-in recorder only records the
              entire screen and does not support audio recording.
            </p>
            <p>
              In Ubuntu, you can record your screen or video using various
              methods. Here are some of the best options: 1. Built-in GNOME
              Screen Recorder (For Ubuntu 22.04 and later) If you're using GNOME
              (default in Ubuntu), you can use the built-in screen recorder:
              Steps: Press Ctrl + Alt + Shift + R to start recording. A red dot
              will appear in the top-right corner, indicating recording is in
              progress. Press the same shortcut (Ctrl + Alt + Shift + R) again
              to stop recording. The recorded video is saved in
              ~/Videos/Screencasts. ⚠️ This built-in recorder only records the
              entire screen and does not support audio recording.
            </p>
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
