import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CertificationAdmin from "./components/CertificationAdmin";

function App() {
  const [route, setRoute] = useState(
    window.location.hash === "#admin/certifications" ? "admin" : "portfolio"
  );

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash === "#admin/certifications" ? "admin" : "portfolio");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (route === "admin") {
    return (
      <CertificationAdmin
        onReturnToPortfolio={() => {
          window.location.hash = "";
          setRoute("portfolio");
        }}
      />
    );
  }

  return (
    <>
      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="certifications">
          <Certifications />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </main>
    </>
  );
}

export default App;