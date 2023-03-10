import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import NavDrawer from "../components/NavDrawer";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const [showScrollProgress, setShowScrollProgress] = useState(false);

  // Set visibility of navbar scroll progress bar based on path
  useEffect(() => {
    if (router.pathname.includes("/article/")) {
      setShowScrollProgress(true);
    } else {
      setShowScrollProgress(false);
    }
  }, [router.pathname]);

  // Setup nav drawer
  const toggleNavDrawer = () => {
    setNavbarOpen((prev) => !prev);
  };

  const preventScrolling = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const currentContainer = container.current;
    if (currentContainer) {
      if (navbarOpen) {
        currentContainer.addEventListener("wheel", preventScrolling);
      }

      return () => {
        currentContainer.removeEventListener("wheel", preventScrolling);
      };
    }
  }, [navbarOpen]);

  return (
    <div className="relative flex flex-col min-h-screen" ref={container}>
      <Head>
        <title>The Front Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        onMenuClick={toggleNavDrawer}
        showScrollProgress={showScrollProgress}
      />

      <div className="flex-1 mt-20 px-8">
        <AnimatePresence>
          {navbarOpen && <NavDrawer toggleNavDrawer={toggleNavDrawer} />}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MyApp;
