import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

import SubscribeModal from "./components/ui/SubscribeModal";

import { ThemeProvider } from "./context/ThemeContext";

import AdminLogin from "./pages/AdminLogin";
import AdminSubscribers from "./pages/AdminSubscribers";

/* =========================================================
   SUPABASE CLIENT
========================================================= */

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

/* =========================================================
   APP CONTENT
========================================================= */

function AppContent() {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname
  );

  const [isLearningDetails, setIsLearningDetails] =
    useState(
      window.location.hash.startsWith("#learning/")
    );

  const [session, setSession] = useState(null);

  const [loadingSession, setLoadingSession] = useState(true);

  /* =========================================================
     GET SUPABASE SESSION
  ========================================================= */

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoadingSession(false);
    };

    getSession();

    /* Listen for login/logout */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
     ADMIN ROUTES
  ========================================================= */

  const isAdminRoute =
    currentPath === "/admin" ||
    currentPath === "/admin/" ||
    currentPath === "/admin/subscribers";

  /* =========================================================
     ADMIN PAGE
  ========================================================= */

  const renderAdminPage = () => {
    /* Wait for Supabase session */
    if (loadingSession) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400">
          <div className="text-sm tracking-widest uppercase">
            Loading admin...
          </div>
        </div>
      );
    }

    /* =======================================================
       ADMIN LOGIN
    ======================================================= */

    if (
      currentPath === "/admin" ||
      currentPath === "/admin/"
    ) {
      if (session) {
        navigateTo("/admin/subscribers");
        return null;
      }

      return (
        <AdminLogin
          onLogin={(newSession) => {
            setSession(newSession);

            window.history.pushState(
              {},
              "",
              "/admin/subscribers"
            );

            setCurrentPath("/admin/subscribers");
          }}
        />
      );
    }

    /* =======================================================
       ADMIN SUBSCRIBERS
    ======================================================= */

    if (currentPath === "/admin/subscribers") {
      if (!session) {
        return (
          <AdminLogin
            onLogin={(newSession) => {
              setSession(newSession);

              window.history.pushState(
                {},
                "",
                "/admin/subscribers"
              );

              setCurrentPath("/admin/subscribers");
            }}
          />
        );
      }

      return (
        <AdminSubscribers
          session={session}
          onLogout={async () => {
            await supabase.auth.signOut();

            setSession(null);

            window.history.pushState(
              {},
              "",
              "/admin"
            );

            setCurrentPath("/admin");
          }}
        />
      );
    }

    return null;
  };

  /* =========================================================
     NORMAL PORTFOLIO ROUTING
  ========================================================= */

  const renderPage = () => {
    /* =======================================================
       CI/CD PIPELINE
    ======================================================= */

    if (currentPath === "/pipeline") {
      return <DeploymentPipeline />;
    }

    /* =======================================================
       AWS ARCHITECTURE
    ======================================================= */

    if (currentPath === "/aws-architecture") {
      return <AwsArchitecture />;
    }

    /* =======================================================
       DEVOPS INCIDENT LAB
    ======================================================= */

    if (currentPath === "/incident-lab") {
      return <IncidentLab />;
    }

    /* =======================================================
       LEARNING DETAILS
    ======================================================= */

    if (isLearningDetails) {
      return <LearningDetails />;
    }

    /* =======================================================
       MAIN HOME PAGE
    ======================================================= */

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
     ADMIN UI
  ========================================================= */

  if (isAdminRoute) {
    return renderAdminPage();
  }

  /* =========================================================
     PUBLIC PORTFOLIO UI
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

      <SubscribeModal />
    </>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}