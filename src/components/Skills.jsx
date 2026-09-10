import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiJavascript,
} from "react-icons/si";

const Skills = () => {
  const skillsData = [
    { name: "React.js", icon: <FaReact />, color: "text-cyan-400" },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
    { name: "Express.js", icon: <SiExpress />, color: "text-gray-300" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-600" },
    { name: "Java", icon: <FaJava />, color: "text-orange-500" },
    { name: "Python", icon: <FaPython />, color: "text-yellow-400" },
    { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-300" },
    { name: "MySQL", icon: <SiMysql />, color: "text-blue-500" },
    { name: "Git & GitHub", icon: <FaGitAlt />, color: "text-orange-600" },
    { name: "VS Code", icon: <FaDatabase />, color: "text-blue-400" },
  ];

  return (
    <section
      id="skills"
      className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            Technologies and tools I work with on a daily basis
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 text-center"
            >
              <div className="text-4xl mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                <span className={skill.color}>{skill.icon}</span>
              </div>
              <h3 className="text-slate-300 font-medium text-sm group-hover:text-cyan-400 transition-colors duration-300">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
