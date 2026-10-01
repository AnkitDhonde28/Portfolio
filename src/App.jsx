import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import ColorCustomizer from "./components/ui/ColorCustomizer";
import Terminal from "./components/ui/Terminal";
import FloatingTools from "./components/ui/FloatingTools";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Github from "./sections/Github";
import Projects from "./sections/Projects";
import Learning from "./sections/Learning";
import LearningDetails from "./sections/LearningDetails";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";

import DeploymentPipeline from "./sections/DeploymentPipeline";
import AwsArchitecture from "./sections/AwsArchitecture";
import IncidentLab from "./sections/IncidentLab";

import { ThemeProvider } from "./context/ThemeContext";

function AppContent() {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname
  );

  const [isLearningDetails, setIsLearningDetails] =
    useState(
      window.location.hash.startsWith("#learning/")
    );

  /* =========================================================
     HANDLE BROWSER NAVIGATION
  ========================================================= */

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);

      setIsLearningDetails(
        window.location.hash.startsWith("#learning/")
      );
    };

    handleNavigation();

    window.addEventListener(
      "popstate",
      handleNavigation
    );

    window.addEventListener(
      "hashchange",
      handleNavigation
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handleNavigation
      );

      window.removeEventListener(
        "hashchange",
        handleNavigation
      );
    };
  }, []);

  /* =========================================================
     NAVIGATE TO SEPARATE PAGE
  ========================================================= */

  const navigateTo = (path) => {
    window.history.pushState({}, "", path);

    setCurrentPath(path);

    setIsLearningDetails(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     PAGE ROUTING
  ========================================================= */

  const renderPage = () => {
    /*
     * =======================================================
     * CI/CD PIPELINE
     * =======================================================
     */

    if (currentPath === "/pipeline") {
      return <DeploymentPipeline />;
    }

    /*
     * =======================================================
     * AWS ARCHITECTURE
     * =======================================================
     */

    if (currentPath === "/aws-architecture") {
      return <AwsArchitecture />;
    }

    /*
     * =======================================================
     * DEVOPS INCIDENT LAB
     * =======================================================
     */

    if (currentPath === "/incident-lab") {
      return <IncidentLab />;
    }

    /*
     * =======================================================
     * LEARNING DETAILS
     * =======================================================
     */

    if (isLearningDetails) {
      return <LearningDetails />;
    }

    /*
     * =======================================================
     * MAIN HOME PAGE
     * =======================================================
     */

    return (
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
    );
  };

  /* =========================================================
     APP
  ========================================================= */

  return (
    <>
      <Navbar onNavigate={navigateTo} />

      <main className="pt-20">
        {renderPage()}
      </main>

      <Footer />

      {/* =====================================================
          GLOBAL UI TOOLS
      ===================================================== */}

      <ColorCustomizer />

      <Terminal />

      <FloatingTools />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}