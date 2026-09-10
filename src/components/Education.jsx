import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";

const Education = () => {
  const educationData = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Babu Banarasi Das University",
      location: "Lucknow, Uttar Pradesh",
      period: "2023 - 2027",
      description:
        "Currently pursuing my Bachelor's degree with focus on software development, data structures, algorithms, and web technologies.",
      icon: <FaGraduationCap />,
    },
    {
      degree: "Intermediate (12th)",
      institution: "Mahendra Technical Inter College",
      location: "Lucknow, Uttar Pradesh",
      period: "2021 - 2022",
      description:
        "Completed higher secondary education with a focus on Physics, Chemistry, and Mathematics.",
      icon: <IoBookSharp />,
    },
  ];

  return (
    <section
      id="education"
      className="relative py-24 px-6 bg-slate-800/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            Academic background and qualifications
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 transform md:-translate-x-1/2" />

          {educationData.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900 transform -translate-x-1/2 mt-6 z-10" />

              {/* Content */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5">
                  {/* Icon */}
                  <div
                    className={`text-2xl mb-3 text-cyan-400 ${
                      index % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {item.degree}
                  </h3>

                  <p className="text-cyan-400 font-medium text-sm mb-2">
                    {item.institution}
                  </p>

                  <div
                    className={`flex items-center gap-4 text-slate-400 text-xs mb-3 ${
                      index % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt /> {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> {item.period}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
