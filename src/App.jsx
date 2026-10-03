import { useEffect, useState } from "react";

import { supabase } from "./lib/supabase";

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
import AdminArticles from "./pages/AdminArticles";
import AdminArticleEditor from "./pages/AdminArticleEditor";

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

  const [loadingSession, setLoadingSession] =
    useState(true);

  /* =======================================================
     GET SUPABASE SESSION
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "Supabase getSession error:",
            error
          );
        }

        if (mounted) {
          setSession(session);
          setLoadingSession(false);
        }
      } catch (error) {
        console.error(
          "Session initialization error:",
          error
        );

        if (mounted) {
          setLoadingSession(false);
        }
      }
    };

    getSession();

    /* =====================================================
       AUTH STATE LISTENER
    ===================================================== */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setSession(session);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /* =======================================================
     HANDLE BROWSER NAVIGATION
  ======================================================= */

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(
        window.location.pathname
      );

      setIsLearningDetails(
        window.location.hash.startsWith(
          "#learning/"
        )
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

  /* =======================================================
     NAVIGATE TO PAGE
  ======================================================= */

  const navigateTo = (path) => {
    window.history.pushState(
      {},
      "",
      path
    );

    setCurrentPath(path);

    setIsLearningDetails(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     ADMIN ROUTES
  ======================================================= */

  const isAdminRoute =
    currentPath === "/admin" ||
    currentPath === "/admin/" ||
    currentPath === "/admin/subscribers" ||
    currentPath === "/admin/articles" ||
    currentPath === "/admin/articles/new" ||
    currentPath.startsWith(
      "/admin/articles/"
    );

  /* =======================================================
     ADMIN LOGIN
  ======================================================= */

  const handleLogin = (newSession) => {
    setSession(newSession);

    window.history.pushState(
      {},
      "",
      "/admin/subscribers"
    );

    setCurrentPath(
      "/admin/subscribers"
    );
  };

  /* =======================================================
     ADMIN LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(
        "Supabase logout error:",
        error
      );
    }

    setSession(null);

    window.history.pushState(
      {},
      "",
      "/admin"
    );

    setCurrentPath("/admin");
  };

  /* =======================================================
     LOGIN PAGE
  ======================================================= */

  const renderLogin = () => {
    return (
      <AdminLogin
        onLogin={handleLogin}
      />
    );
  };

  /* =======================================================
     ADMIN PAGE
  ======================================================= */

  const renderAdminPage = () => {
    /* =====================================================
       WAIT FOR SESSION
    ===================================================== */

    if (loadingSession) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400">
          <div className="text-sm tracking-widest uppercase">
            Loading admin...
          </div>
        </div>
      );
    }

    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    if (
      currentPath === "/admin" ||
      currentPath === "/admin/"
    ) {
      if (session) {
        window.history.replaceState(
          {},
          "",
          "/admin/subscribers"
        );

        setCurrentPath(
          "/admin/subscribers"
        );

        return null;
      }

      return renderLogin();
    }

    /* =====================================================
       PROTECTED ADMIN ROUTES
    ===================================================== */

    if (!session) {
      return renderLogin();
    }

    /* =====================================================
       SUBSCRIBERS
    ===================================================== */

    if (
      currentPath === "/admin/subscribers"
    ) {
      return (
        <AdminSubscribers
          session={session}
          onLogout={handleLogout}
        />
      );
    }

    /* =====================================================
       ARTICLES LIST
    ===================================================== */

    if (
      currentPath === "/admin/articles"
    ) {
      return (
        <AdminArticles
          session={session}
          onLogout={handleLogout}
        />
      );
    }

    /* =====================================================
       NEW ARTICLE
    ===================================================== */

    if (
      currentPath === "/admin/articles/new"
    ) {
      return (
        <AdminArticleEditor
          session={session}
          onLogout={handleLogout}
        />
      );
    }

    /* =====================================================
       EDIT ARTICLE
       /admin/articles/:id
    ===================================================== */

    if (
      currentPath.startsWith(
        "/admin/articles/"
      )
    ) {
      const articleId =
        currentPath.split(
          "/admin/articles/"
        )[1];

      return (
        <AdminArticleEditor
          session={session}
          articleId={articleId}
          onLogout={handleLogout}
        />
      );
    }

    return null;
  };

  /* =========================================================
     NORMAL PORTFOLIO ROUTING
  ========================================================= */

  const renderPage = () => {
    /* =====================================================
       DEPLOYMENT PIPELINE
    ===================================================== */

    if (
      currentPath === "/pipeline"
    ) {
      return <DeploymentPipeline />;
    }

    /* =====================================================
       AWS ARCHITECTURE
    ===================================================== */

    if (
      currentPath ===
      "/aws-architecture"
    ) {
      return <AwsArchitecture />;
    }

    /* =====================================================
       INCIDENT LAB
    ===================================================== */

    if (
      currentPath === "/incident-lab"
    ) {
      return <IncidentLab />;
    }

    /* =====================================================
       LEARNING DETAILS
    ===================================================== */

    if (isLearningDetails) {
      return <LearningDetails />;
    }

    /* =====================================================
       HOME PAGE
    ===================================================== */

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
     ADMIN
  ========================================================= */

  if (isAdminRoute) {
    return renderAdminPage();
  }

  /* =========================================================
     PORTFOLIO
  ========================================================= */

  return (
    <>
      <Navbar
        onNavigate={navigateTo}
      />

      <main className="pt-20">
        {renderPage()}
      </main>

      <Footer />

      <ColorCustomizer />

      <Terminal />

      <FloatingTools />

      <SubscribeModal />
    </>
  );
}

/* =========================================================
   ROOT APP
========================================================= */

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}