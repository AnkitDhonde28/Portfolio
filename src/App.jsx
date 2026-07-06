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


function App() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Github />
        <Projects />
        <Contact />
        <Certifications />
      </main>
      <Footer />
    </>
  );
}

export default App;