import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiCode } from "react-icons/hi";

const Projects = () => {
  const projectsData = [
    {
      title: "StackPeak Job Portal",
      description:
        "Full Stack Job Portal with JWT Authentication, Role Based Access, Search Filters and REST APIs. Built with React.js, Node.js, Express.js, and MongoDB.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      github: "https://github.com/akashsingh77/StackPeak-Job-Portal",
      live: "https://stackpeak-job-portal.vercel.app",
    },
    {
      title: "E-Commerce Website",
      description:
        "Built using Spring Boot, Java, MySQL, HTML, CSS and JavaScript with authentication, shopping cart, product management, and order tracking system.",
      techStack: ["Java", "Spring Boot", "MySQL", "HTML/CSS", "JavaScript"],
      github: "https://github.com/akashsingh77/ecommerce-springboot",
      live: null,
    },
    {
      title: "Real-Time Chat Application",
      description:
        "A real-time messaging app with Socket.io, featuring private messaging, room creation, typing indicators, and online status tracking.",
      techStack: ["React.js", "Socket.io", "Node.js", "MongoDB"],
      github: "https://github.com/akashsingh77/chat-app",
      live: "https://chat-app-akash.vercel.app",
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-24 px-6 bg-gradient-to-b from-slate-800/50 to-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            Some of the projects I have built
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col"
            >
              {/* Icon */}
              <div className="text-3xl text-cyan-400 mb-4">
                <HiCode />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-cyan-300 rounded-full border border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-all duration-300"
                >
                  <FaGithub /> Code
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 text-white text-sm rounded-lg transition-all duration-300"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
