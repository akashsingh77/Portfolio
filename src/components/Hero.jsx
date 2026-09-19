import { useEffect, useRef, useState } from "react";

const PROFILE_STORAGE_KEY = "portfolio.profile.image";
const DEFAULT_PROFILE_IMAGE = "/profile.png";
const DEFAULT_RESUME_URL = "/resume.pdf";
const PHOTO_MAX_SIZE = 2 * 1024 * 1024;

const Hero = () => {
  const profileInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const resumeViewUrlRef = useRef(null);

  const getStoredProfile = () => {
    try {
      const item = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (!item) return DEFAULT_PROFILE_IMAGE;

      const storedProfile = JSON.parse(item);
      return storedProfile?.url || DEFAULT_PROFILE_IMAGE;
    } catch {
      return DEFAULT_PROFILE_IMAGE;
    }
  };

  const [profileImage, setProfileImage] = useState(getStoredProfile);
  const [feedback, setFeedback] = useState("");
  const [resumeFeedback, setResumeFeedback] = useState("");
  const [resume, setResume] = useState({ url: DEFAULT_RESUME_URL, name: "resume.pdf" });
  const [selectedResumeFile, setSelectedResumeFile] = useState(null);

  useEffect(() => {
    return () => {
      if (resumeViewUrlRef.current) {
        URL.revokeObjectURL(resumeViewUrlRef.current);
      }
    };
  }, []);

  const validateProfileImage = (file) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Please upload a valid image file: PNG, JPG, WEBP, or GIF.");
    }

    if (file.size > PHOTO_MAX_SIZE) {
      throw new Error("Profile photo must be smaller than 2MB.");
    }
  };

  const validateResumePdf = (file) => {
    if (!file) {
      throw new Error("No file selected. Please choose a PDF resume.");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Please upload a valid PDF resume.");
    }

    if (file.size <= 0) {
      throw new Error("The selected PDF is empty. Please choose a non-empty PDF.");
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      validateProfileImage(file);
      const reader = new FileReader();

      reader.onload = () => {
        const profile = {
          url: reader.result,
          name: file.name,
          type: file.type,
          size: file.size,
        };

        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
        setProfileImage(reader.result);
        setFeedback("Profile photo updated.");
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setFeedback(error.message);
      if (profileInputRef.current) profileInputRef.current.value = "";
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];

    try {
      validateResumePdf(file);

      if (resumeViewUrlRef.current) {
        URL.revokeObjectURL(resumeViewUrlRef.current);
        resumeViewUrlRef.current = null;
      }

      setSelectedResumeFile(file);
      setResume({ url: DEFAULT_RESUME_URL, name: file.name });
      setResumeFeedback("Resume uploaded successfully");
    } catch (error) {
      setResumeFeedback(error.message);
      setSelectedResumeFile(null);
      setResume({ url: DEFAULT_RESUME_URL, name: "resume.pdf" });
    } finally {
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    }
  };

  const handleViewResume = (event) => {
    event.preventDefault();

    if (!selectedResumeFile) {
      setResumeFeedback("No file selected. Please upload a PDF resume first.");
      return;
    }

    try {
      validateResumePdf(selectedResumeFile);
    } catch (error) {
      setResumeFeedback(error.message);
      return;
    }

    const url = URL.createObjectURL(selectedResumeFile);
    resumeViewUrlRef.current = url;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownloadResume = (event) => {
    event.preventDefault();

    if (!selectedResumeFile) {
      setResumeFeedback("No file selected. Please upload a PDF resume first.");
      return;
    }

    try {
      validateResumePdf(selectedResumeFile);
    } catch (error) {
      setResumeFeedback(error.message);
      return;
    }

    const downloadUrl = URL.createObjectURL(selectedResumeFile);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = selectedResumeFile.name || "resume.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
    }, 0);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-xl shadow-cyan-500/20">
              <img
                src={profileImage}
                alt="Akash Singh"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              ref={profileInputRef}
              id="profilePhotoUpload"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={handleProfileUpload}
            />
            <label
              htmlFor="profilePhotoUpload"
              className="absolute bottom-2 right-2 bg-slate-900/80 border border-cyan-300 rounded-full px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 cursor-pointer"
            >
              Change Photo
            </label>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Akash Singh
          </span>
        </h1>

        <h2 className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-6 font-light">
          Full Stack Developer
        </h2>

        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
          Passionate Full Stack Developer skilled in React.js, Node.js,
          Express.js, MongoDB, Java, and Python. I build scalable web
          applications with clean, efficient code.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <input
            ref={resumeInputRef}
            id="resumeUpload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleResumeUpload}
          />
          <label
            htmlFor="resumeUpload"
            className="px-8 py-3 border border-slate-500 text-slate-300 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            Upload Resume
          </label>
          <a
            href={resume.url}
            target="_blank"
            rel="noreferrer"
            onClick={handleViewResume}
            className="px-8 py-3 border border-slate-500 text-slate-300 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 hover:-translate-y-0.5"
          >
            View Resume
          </a>
          <a
            href={resume.url}
            download={resume.name || "resume.pdf"}
            onClick={handleDownloadResume}
            className="px-8 py-3 border border-slate-500 text-slate-300 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 hover:-translate-y-0.5"
          >
            Download Resume
          </a>
        </div>

        {resumeFeedback && (
          <p className="mt-4 text-sm text-cyan-300 text-center">{resumeFeedback}</p>
        )}

        {feedback && (
          <p className="mt-4 text-sm text-cyan-300 text-center">{feedback}</p>
        )}

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 text-slate-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
