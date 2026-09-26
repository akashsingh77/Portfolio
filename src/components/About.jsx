import { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";

const About = () => {
  const [profileImageAvailable, setProfileImageAvailable] = useState(true);
  return (
    <section id="about" className="relative py-24 px-6 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-xl shadow-slate-900/50">
              {profileImageAvailable ? (
                <img
                  src="/profile.jpeg"
                  alt="Akash Singh"
                  className="w-full h-full object-cover"
                  onError={() => setProfileImageAvailable(false)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-cyan-300 text-6xl font-bold" aria-label="Profile photo unavailable">
                  AS
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <FaUserGraduate className="text-cyan-400 text-xl" />
              <span className="text-cyan-400 font-semibold">Who I Am</span>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I am a Computer Science Engineering student at{" "}
              <span className="text-cyan-400 font-medium">
                Babu Banarasi Das University
              </span>
              . I enjoy building scalable web applications and learning new
              technologies.
            </p>
            <p className="text-slate-400 leading-relaxed">
              My interests include Full Stack Development, REST APIs,
              Authentication, and Database Design. I'm passionate about turning
              complex problems into simple, beautiful, and intuitive solutions.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="text-center p-4 rounded-xl bg-slate-800 border border-slate-700">
                <div className="text-2xl font-bold text-cyan-400">10+</div>
                <div className="text-slate-400 text-sm mt-1">Projects</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-slate-800 border border-slate-700">
                <div className="text-2xl font-bold text-cyan-400">5+</div>
                <div className="text-slate-400 text-sm mt-1">Skills</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-slate-800 border border-slate-700">
                <div className="text-2xl font-bold text-cyan-400">2+</div>
                <div className="text-slate-400 text-sm mt-1">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
