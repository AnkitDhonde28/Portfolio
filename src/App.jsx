import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Footer from "./components/layout/Footer";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Certifications from "./sections/Certifications";
import Github from "./sections/Github";
import Learning from "./sections/Learning";
import LearningDetails from "./sections/LearningDetails";

function App() {
  const [isLearningDetails, setIsLearningDetails] = useState(
    window.location.hash.startsWith("#learning/")
  );

  useEffect(() => {
    const handleHashChange = () => {
      setIsLearningDetails(
        window.location.hash.startsWith("#learning/")
      );
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {isLearningDetails ? (
          <LearningDetails />
        ) : (
          <>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Github />
            <Projects />
            <Learning />
            <Certifications />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;