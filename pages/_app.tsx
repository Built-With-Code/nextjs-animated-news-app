import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import NavDrawer from "../components/NavDrawer";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  // Setup nav drawer
  const toggleNavDrawer = () => {
    setNavbarOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col min-h-screen" ref={container}>
      <Head>
        <title>The Front Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar onMenuClick={toggleNavDrawer} />

      <div className="flex-1 mt-20 px-8">
        {navbarOpen && <NavDrawer toggleNavDrawer={toggleNavDrawer} />}
        <Component {...pageProps} key={router.route} />
      </div>
    </div>
  );
}

export default MyApp;
