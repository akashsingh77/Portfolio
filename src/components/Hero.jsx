import { useEffect, useState } from "react";

const PROFILE_IMAGE_URL = "/profile.jpeg";
const RESUME_URL = "/resume.pdf";

const Hero = () => {
  const [profileImageAvailable, setProfileImageAvailable] = useState(true);
  const [resumeAvailable, setResumeAvailable] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(RESUME_URL, { method: "HEAD" })
      .then((response) => {
        if (active) setResumeAvailable(response.ok);
      })
      .catch(() => {
        if (active) setResumeAvailable(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-xl shadow-cyan-500/20 flex items-center justify-center bg-slate-800">
              {profileImageAvailable ? (
                <img src={PROFILE_IMAGE_URL} alt="Akash Singh" className="w-full h-full object-cover" onError={() => setProfileImageAvailable(false)} />
              ) : (
                <span className="text-cyan-300 text-4xl font-bold" aria-label="Profile photo unavailable">AS</span>
              )}
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Akash Singh</span>
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-6 font-light">Full Stack Developer</h2>
        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
          Passionate Full Stack Developer skilled in React.js, Node.js,
          Express.js, MongoDB, Java, and Python. I build scalable web
          applications with clean, efficient code.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {resumeAvailable ? (
            <>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="px-8 py-3 border border-slate-500 text-slate-300 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 hover:-translate-y-0.5">View Resume</a>
              <a href={RESUME_URL} download="resume.pdf" className="px-8 py-3 border border-slate-500 text-slate-300 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 hover:-translate-y-0.5">Download Resume</a>
            </>
          ) : (
            <p className="px-8 py-3 border border-slate-700 text-slate-400 font-semibold rounded-lg" role="status">Resume is currently unavailable.</p>
          )}
        </div>

        <div className="mt-16 animate-bounce">
          <svg className="w-6 h-6 text-slate-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
